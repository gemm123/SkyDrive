const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload');
const { checkAuthorization } = require('../middleware');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Menentukan folder penyimpanan file
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4(); // Generate UUID sebagai bagian dari nama file
      const fileExtension = file.originalname.split('.').pop(); // Dapatkan ekstensi file
      const fileName = `photo-${uniqueSuffix}.${fileExtension}`; // Buat nama file yang unik
      cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

class UploadRoute {
  static initialize() {
    router.get('/photo', checkAuthorization, UploadController.uploadPhoto);
    router.post('/photo', checkAuthorization, upload.single('photo'), UploadController.postUploadPhoto);
    return router;
  }
}

module.exports = UploadRoute;