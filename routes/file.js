const express = require('express');
const router = express.Router();
const FileController = require('../controllers/file');
const { checkAuthorization } = require('../middleware');

class FileRoute {
    static initialize() {
      router.get('/', checkAuthorization, FileController.getAllUploadFile);
      router.post('/delete', checkAuthorization, FileController.deleteUploadFile)
      return router;
    }
  }
  
  module.exports = FileRoute;