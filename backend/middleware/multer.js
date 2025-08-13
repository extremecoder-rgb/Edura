import multer from 'multer';
import path from 'path';
import fs from 'fs';

console.log('🔧 Multer middleware loading...');

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory already exists');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📁 Multer destination called for file:', file.originalname);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    console.log('📝 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('🔍 Multer fileFilter - file mimetype:', file.mimetype);
    console.log('🔍 File details:', { 
      originalname: file.originalname, 
      size: file.size,
      fieldname: file.fieldname 
    });
    if (file.mimetype.startsWith('image/')) {
      console.log('✅ File accepted');
      cb(null, true);
    } else {
      console.log('❌ File rejected - not an image');
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  onError: function(err, next) {
    console.log('💥 Multer error:', err);
    next(err);
  }
});

// Add error handling wrapper
const uploadMiddleware = (req, res, next) => {
  console.log('🚀 Upload middleware called');
  console.log('📋 Request headers content-type:', req.headers['content-type']);
  console.log('📋 Request method:', req.method);
  console.log('📋 Request URL:', req.url);
  
  upload.single("photoUrl")(req, res, function(err) {
    if (err) {
      console.log('💥 Upload middleware error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
        }
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      }
      return res.status(500).json({ message: `Server error: ${err.message}` });
    }
    console.log('✅ Upload middleware completed successfully');
    console.log('📁 req.file after multer:', req.file ? 'File present' : 'No file');
    if (req.file) {
      console.log('📁 File details:', {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      });
    }
    next();
  });
};

// Export both the upload object and the middleware
export default upload;
export { uploadMiddleware };