const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home');

class HomeRoute {
  static initialize() {
    router.get('/', HomeController.homePage);
    return router;
  }
}

module.exports = HomeRoute;
