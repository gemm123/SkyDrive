const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

class UserRoute {
  static initialize() {
    router.get('/register', UserController.register);
    router.post('/register', UserController.postRegister);
    router.get('/login', UserController.login);
    router.post('/login', UserController.postLogin);
    router.get('/logout', UserController.logout);
    return router;
  }
}

module.exports = UserRoute;
