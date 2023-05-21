const AlbumRepository = require('../repositories/album');

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
}

module.exports = AlbumController;