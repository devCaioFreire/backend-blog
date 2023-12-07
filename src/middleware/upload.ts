import multer from 'multer';

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const uploadMiddleware = multer({ storage })
// export const uploadMiddleware = multer({ dest: 'uploads/' })