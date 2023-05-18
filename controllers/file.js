const UploadRepository = require("../repositories/upload");
const FileRepository = require("../repositories/file");
const fs = require('fs');

class FileController {
    static async getAllUploadFile(req, res) {
        const uploadRepository = new UploadRepository();

        try {
            const files = await uploadRepository.getAllUploadFileByUserId(req.user.id);
            res.render('file', { data: files });
        } catch (error) {
            throw error
        }
    }

    static async deleteUploadFile(req, res) {
        const uploadRepository = new UploadRepository();
        const fileRepository = new FileRepository();
        const { uploadId } = req.body;

        try {
            const uploadFile = await uploadRepository.getUploadFileById(uploadId);
            fs.unlinkSync(uploadFile.path);
            await fileRepository.deleteFile(uploadId)
            await uploadRepository.deleteUploadFileByUploadId(uploadId)
            res.redirect(302, '/file');
        } catch (error) {
            throw error
        }
    }
}

module.exports = FileController;