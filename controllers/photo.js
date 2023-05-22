const UploadRepository = require("../repositories/upload");
const PhotoRepository = require("../repositories/photo");
const UserRepository = require("../repositories/user");
const fs = require('fs');

class PhotoController {
    static async getAllUploadPhoto(req, res) {
        const uploadRepository = new UploadRepository();
        const userRepository = new UserRepository();

        try {
            const photos = await uploadRepository.getAllUploadPhotoByUserId(req.user.id);
            const user = await userRepository.getUserByUserId(req.user.id);
            res.render('photo', { data: photos, user: user });
        } catch (error) {
            throw error
        }
    }

    static async deleteUploadPhoto(req, res) {
        const uploadRepository = new UploadRepository();
        const photoRepository = new PhotoRepository();
        const { uploadId } = req.body;

        try {
            const uploadPhoto = await uploadRepository.getUploadPhotoById(uploadId);
            fs.unlinkSync(uploadPhoto.path);
            await photoRepository.deletePhoto(uploadId)
            await uploadRepository.deleteUploadPhotoByUploadId(uploadId)
            res.redirect(302, '/photo');
        } catch (error) {
            throw error
        }
    }
}

module.exports = PhotoController;