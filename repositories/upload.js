const Upload = require('../models/upload');
const Photo = require('../models/photo');
const User = require('../models/user');
const File = require('../models/file');

class UploadRepository {
    async createUploadPhoto(name, path, userId) {
        try {
            const upload = await Upload.create({ name, path, userId });
            return upload;
        } catch (error) {
            throw error;
        }
    }

    async createUploadFile(name, path, userId) {
        try {
            const upload = await Upload.create({ name, path, userId });
            return upload;
        } catch (error) {
            throw error;
        }
    }

    async getAllUploadPhotoByUserId(userId) {
        try {
            const uploadPhoto = await Upload.findAll({
                attributes: ['id' ,'name', 'path'],
                where: {},
                include: [
                    {
                        model: Photo,
                        required: false,
                    },
                    {
                        model: User,
                        where: {
                            id: userId,
                        },
                    },
                ],
            })
            return uploadPhoto;
        } catch (error) {
            throw error;
        }
    }

    async getAllUploadFileByUserId(userId) {
        try {
            const uploadFile = await Upload.findAll({
                attributes: ['id' ,'name', 'path'],
                where: {},
                include: [
                    {
                        model: File,
                        required: false,
                    },
                    {
                        model: User,
                        where: {
                            id: userId,
                        },
                    },
                ],
            })
            return uploadFile;
        } catch (error) {
            throw error;
        }
    }

    async getUploadPhotoById(uploadId) {
        try {
            const uploadPhoto = await Upload.findOne({ where: { id: uploadId } });
            return uploadPhoto;
        } catch (error) {
            throw error;
        }
    }

    async getUploadFileById(uploadId) {
        try {
            const uploadFile = await Upload.findOne({ where: { id: uploadId } });
            return uploadFile;
        } catch (error) {
            throw error;
        }
    }

    async deleteUploadPhotoByUploadId(uploadId) {
        try {
            await Upload.destroy({
                where: {
                    id: uploadId,
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async deleteUploadFileByUploadId(uploadId) {
        try {
            await Upload.destroy({
                where: {
                    id: uploadId,
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UploadRepository;