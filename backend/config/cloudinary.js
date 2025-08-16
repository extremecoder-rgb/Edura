import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload images (thumbnails)
const uploadImageToCloudinary = async (filePath) => {
    console.log('Cloudinary image upload started for:', filePath);
    
    try {
        if (!filePath) {
            console.log('No file path provided to Cloudinary');
            return null;
        }

        // Check if file exists before uploading
        if (!fs.existsSync(filePath)) {
            console.log('File does not exist at path:', filePath);
            return null;
        }

        console.log('File exists, uploading image to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            folder: 'lms_thumbnails',
            timeout: 30000 // 30 seconds timeout for images
        });

        console.log('Cloudinary image upload successful:', uploadResult.secure_url);

        // Clean up local file after successful upload
        fs.unlinkSync(filePath);
        console.log('Local image file cleaned up');

        return uploadResult.secure_url;

    } catch (error) {
        console.error('Cloudinary image upload error:', error);
        
        // Provide specific error messages based on error type
        if (error.http_code === 413) {
            throw new Error('Image file is too large for Cloudinary. Please use a smaller image.');
        } else if (error.http_code === 401) {
            throw new Error('Cloudinary authentication failed. Please check your API credentials.');
        } else if (error.http_code === 429) {
            throw new Error('Cloudinary rate limit exceeded. Please try again later.');
        } else if (error.message.includes('Unsupported file type')) {
            throw new Error(`Image format not supported by Cloudinary. Please use JPG, PNG, GIF, or other supported image formats.`);
        } else {
            throw new Error(`Cloudinary image upload failed: ${error.message}`);
        }
        
        // Clean up local file even if upload fails
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Local image file cleaned up after error');
            }
        } catch (cleanupError) {
            console.error('Error cleaning up local image file:', cleanupError);
        }
    }
};

// Upload videos (lectures)
const uploadVideoToCloudinary = async (filePath) => {
    console.log('Cloudinary video upload started for:', filePath);
    
    try {
        if (!filePath) {
            console.log('No file path provided to Cloudinary');
            return null;
        }

        // Check if file exists before uploading
        if (!fs.existsSync(filePath)) {
            console.log('File does not exist at path:', filePath);
            return null;
        }

        console.log('File exists, uploading video to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'lms_videos',
            chunk_size: 6000000, // 6MB chunks for large files
            timeout: 60000 // 60 seconds timeout for videos
        });

        console.log('Cloudinary video upload successful:', uploadResult.secure_url);

        // Clean up local file after successful upload
        fs.unlinkSync(filePath);
        console.log('Local video file cleaned up');

        return uploadResult.secure_url;

    } catch (error) {
        console.error('Cloudinary video upload error:', error);
        
        // Provide specific error messages based on error type
        if (error.http_code === 413) {
            throw new Error('Video file is too large for Cloudinary. Please use a smaller video or compress it.');
        } else if (error.http_code === 401) {
            throw new Error('Cloudinary authentication failed. Please check your API credentials.');
        } else if (error.http_code === 429) {
            throw new Error('Cloudinary rate limit exceeded. Please try again later.');
        } else if (error.message.includes('Unsupported file type')) {
            throw new Error(`Video format not supported by Cloudinary. Please use MP4, AVI, MOV, or other supported video formats.`);
        } else {
            throw new Error(`Cloudinary video upload failed: ${error.message}`);
        }
        
        // Clean up local file even if upload fails
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Local video file cleaned up after error');
            }
        } catch (cleanupError) {
            console.error('Error cleaning up local video file:', cleanupError);
        }
    }
};

// Legacy function for backward compatibility
const uploadOnCloudinary = async (filePath) => {
    console.log('Legacy uploadOnCloudinary called, using video upload...');
    return uploadVideoToCloudinary(filePath);
};

export default uploadOnCloudinary;
export { uploadImageToCloudinary, uploadVideoToCloudinary };