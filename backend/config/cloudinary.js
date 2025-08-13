import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
    console.log('Cloudinary upload started for:', filePath);
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

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

        console.log('File exists, uploading to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'profile_pictures' // Optional: organize uploads in folders
        });

        console.log('Cloudinary upload successful:', uploadResult.secure_url);

        // Clean up local file after successful upload
        fs.unlinkSync(filePath);
        console.log('Local file cleaned up');

        return uploadResult.secure_url;

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        
        // Clean up local file even if upload fails
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Local file cleaned up after error');
            }
        } catch (cleanupError) {
            console.error('Error cleaning up local file:', cleanupError);
        }
        
        throw error; // Re-throw to be handled by caller
    }
}

export default uploadOnCloudinary;