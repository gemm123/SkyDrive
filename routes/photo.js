const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photo');
const { checkAuthorization } = require('../middleware');

class PhotoRoute {
    static initialize() {
      router.get('/', checkAuthorization, PhotoController.getAllUploadPhoto);
      router.post('/delete', checkAuthorization, PhotoController.deleteUploadPhoto)
      return router;
    }
  }
  
  module.exports = PhotoRoute;