const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload');
const { checkAuthorization } = require('../middleware');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storagePhoto = multer.diskStorage({
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

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Menentukan folder penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // Generate UUID sebagai bagian dari nama file
    const fileExtension = file.originalname.split('.').pop(); // Dapatkan ekstensi file
    const fileName = `file-${uniqueSuffix}.${fileExtension}`; // Buat nama file yang unik
    cb(null, fileName);
  }
});

const uploadPhoto = multer({ storage: storagePhoto });
const uploadFile = multer({ storage: storageFile });

class UploadRoute {
  static initialize() {
    router.get('/photo', checkAuthorization, UploadController.uploadPhoto);
    router.post('/photo', checkAuthorization, uploadPhoto.single('photo'), UploadController.postUploadPhoto);
    router.get('/file', checkAuthorization, UploadController.uploadFile);
    router.post('/file', checkAuthorization, uploadFile.single('file'), UploadController.postUploadFile);
    return router;
  }
}

module.exports = UploadRoute;