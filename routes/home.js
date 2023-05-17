const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home');
const { checkAuthorization } = require('../middleware');

class HomeRoute {
  static initialize() {
    router.get('/', checkAuthorization, HomeController.homePage);
    return router;
  }
}

module.exports = HomeRoute;
