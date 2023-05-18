const UploadRepository = require("../repositories/upload");
const PhotoRepository = require("../repositories/photo");
const FileRepository = require("../repositories/file");

class UploadController {
    static uploadPhoto(req, res) {
        res.render('upload-photo');
    }

    static uploadFile(req, res) {
        res.render('upload-file');
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

    static async postUploadFile(req, res) {
        const { name } = req.body;
        const filePath = req.file.path;

        const uploadRepository = new UploadRepository();
        const fileRepository = new FileRepository();

        try {
            const upload = await uploadRepository.createUploadFile(name, filePath, req.user.id)
            await fileRepository.createFile(upload.id);
            res.redirect(302, '/file');
        } catch (error) {
            res.status(500).render('upload-file', { message: `failed to upload file:` + error });
        }
    }
}

module.exports = UploadController;