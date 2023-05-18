const File = require('../models/file');

class FileRepository {
    async createFile(uploadId) {
        try {
            const file = await File.create({ uploadId });
            return file;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(uploadId) {
        try {
            await File.destroy({
                where: {
                    uploadId: uploadId
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FileRepository;