const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');
const { checkAuthorization } = require('../middleware');

class AlbumRoute {
    static initialize() {
        router.get('/create', checkAuthorization, AlbumController.createAlbum);
        router.post('/create', checkAuthorization, AlbumController.postCreateAlbum);
        router.get('/', checkAuthorization, AlbumController.getAllAlbum)
        router.get('/add-photo/:albumId', checkAuthorization, AlbumController.addPhotoToAlbum);
        router.post('/add-photo/:albumId', checkAuthorization, AlbumController.postAddPhotoToAlbum);
        router.get('/:albumId', checkAuthorization, AlbumController.getPhotoAlbumByAlbumId);
        router.post('/delete', checkAuthorization, AlbumController.deleteAlbumByAlbumId);
        return router;
    }
}

module.exports = AlbumRoute;