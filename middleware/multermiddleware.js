const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = getFileExtension(file);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

function getFileExtension(file) {
  if (file.mimetype.startsWith('image/')) {
    // Handle image files
    if (file.mimetype === 'image/jpeg') {
      return '.jpg';
    } else if (file.mimetype === 'image/png') {
      return '.png';
    } else {
      // Default to no extension for unsupported image types
      return '';
    }
  } else if (file.mimetype.startsWith('audio/')) {
    // Handle audio files (example: MP3)
    if (file.mimetype === 'audio/mpeg') {
      return '.mp3';
    } else {
      // Default to no extension for unsupported audio types
      return '';
    }
  } else {
    // Default to no extension for other file types
    return '';
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and audio files are allowed'));
    }
  }
});

module.exports = upload;
