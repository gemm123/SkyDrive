const UploadRepository = require("../repositories/upload");
const PhotoRepository = require("../repositories/photo");

class UploadController {
    static uploadPhoto(req, res) {
        res.render('upload-photo');
    }

    static async postUploadPhoto(req, res) {
        const { name } = req.body;
        const photoPath = req.file.path;

        const uploadRepository = new UploadRepository();
        const photoRepository = new PhotoRepository();

        try {
            const upload = await uploadRepository.createUploadPhoto(name, photoPath, req.user.id)
            await photoRepository.createPhoto(upload.id);
            res.redirect(302, '/photo');
        } catch (error) {
            res.status(500).render('upload-photo', { message: `failed to upload photo:` + error });
        }
    }
}

module.exports = UploadController;