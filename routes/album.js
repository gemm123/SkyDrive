const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');
const { checkAuthorization } = require('../middleware');

class AlbumRoute {
    static initialize() {
        router.get('/create', checkAuthorization, AlbumController.createAlbum);
        router.post('/create', checkAuthorization, AlbumController.postCreateAlbum);
        router.get('/', checkAuthorization, AlbumController.getAllAlbum)
        return router;
    }
}

module.exports = AlbumRoute;