const Album = require('../models/album');
const User = require('../models/user');

class AlbumRepository {
    async createAlbum(title, description, userId) {
        try {
            const album = await Album.create({ title, description, userId });
            return album;
        } catch (error) {
            throw error;
        }
    }

    async getAllAbumByUserId(userId) {
        try {
            const albums = await Album.findAll({
                include: [
                    {
                        model: User,
                        where: {
                            id: userId,
                        }
                    }
                ]
            })

            return albums;
        } catch (error) {
            throw error
        }
    }
}

module.exports = AlbumRepository;