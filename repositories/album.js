const Album = require('../models/album');
const Photo = require('../models/photo');
const User = require('../models/user');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize');

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

    async getAlbumById(albumId) {
        try {
            const album = await Album.findByPk(albumId);
            return album;
        } catch (error) {
            throw error
        }
    }

    async getAlbumPhotoByAlbumId(albumId) {
        try {
            const album = await Album.findByPk(albumId, {
                include: [Photo]
            });

            const photos = album.Photos;
            const uploads = [];

            for (const photo of photos) {
                const upload = await photo.getUpload();
                uploads.push(upload);
            }

            return uploads;
        } catch (error) {
            throw error
        }
    }

    async deleteAlbumByAlbumId(albumId) {
        console.log(albumId);
        try {
            await sequelize.query(`
                DELETE FROM "AlbumPhoto"
                WHERE "albumId" = ?
            `, {
                type: QueryTypes.DELETE,
                replacements: [albumId] 
            });

            await sequelize.query(`
                DELETE FROM "Albums"
                WHERE "id" = ?
            `, {
                type: QueryTypes.DELETE,
                replacements: [albumId]
            });
        } catch (error) {
            throw error
        }
    }
}

module.exports = AlbumRepository;