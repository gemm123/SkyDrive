const Photo = require('../models/photo');

class PhotoRepository {
    async createPhoto(uploadId) {
        try {
            const photo = await Photo.create({ uploadId });
            return photo;
        } catch (error) {
            throw error;
        }
    }

    async deletePhoto(uploadId) {
        try {
            await Photo.destroy({
                where: {
                    uploadId: uploadId
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PhotoRepository;