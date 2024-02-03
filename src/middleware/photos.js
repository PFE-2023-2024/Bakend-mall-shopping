const multer = require('multer');
const fs = require("fs");
upload= {};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = './uploads/'+req.body.path || './uploads'; 
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
  
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  upload.upload2image = multer({ storage: storage }).array('files',2);
  upload.uploadMultipleImages = multer({ storage: storage }).array('files');
  
  module.exports = upload;