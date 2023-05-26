const UploadRepository = require("../repositories/upload");
const AlbumRepository = require('../repositories/album');
const fs = require('fs');

class AlbumController {
    static createAlbum(req, res) {
        res.render('create-album');
    }

    static async postCreateAlbum(req, res) {
        const { title, description } = req.body;
        const albumRepository = new AlbumRepository();

        try {
            await albumRepository.createAlbum(title, description, req.user.id);
            res.redirect(302, '/album');
        } catch (error) {
            throw error
        }
    }

    static async getAllAlbum(req, res) {
        const albumRepository = new AlbumRepository();

        try {
            const albums = await albumRepository.getAllAbumByUserId(req.user.id);
            res.render('album', { data: albums });
        } catch (error) {
            throw error
        }
    }

    static async addPhotoToAlbum(req, res) {
        const uploadRepository = new UploadRepository();
        const albumId = req.params.albumId;

        try {
            const photos = await uploadRepository.getAllUploadPhotoByUserId(req.user.id);
            res.render('add-photo-to-album', { data: photos, albumId: albumId });
        } catch (error) {
            throw error
        }
    }

    static async postAddPhotoToAlbum(req, res) {
        const albumRepository = new AlbumRepository();
        const albumId = req.params.albumId;
        const selectedPhotoIds = req.body.selectedPhotoIds;
        
        try {
            const album = await albumRepository.getAlbumById(albumId);
            await album.addPhotos(selectedPhotoIds);
            res.redirect(302, '/album');
        } catch (error) {
            throw error
        }
    }
    
    static async getPhotoAlbumByAlbumId(req, res) {
        const albumRepository = new AlbumRepository();
        const albumId = req.params.albumId;

        try {
            const photos = await albumRepository.getAlbumPhotoByAlbumId(albumId);
            res.render('album-photo', { data: photos });
        } catch (error) {
            throw error
        }
    }

    static async deleteAlbumByAlbumId(req, res) {
        const albumRepository = new AlbumRepository();
        const albumId = req.body.albumId;

        try {
            await albumRepository.deleteAlbumByAlbumId(albumId);
            res.redirect(302, '/album')
        } catch (error) {
            throw error
        }
    }
}

module.exports = AlbumController;