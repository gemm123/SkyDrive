// models/Photo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const Upload = require('./upload');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
});

Photo.belongsTo(Upload, { as: 'upload', foreignKey: 'uploadId' });
Upload.hasOne(Photo, { foreignKey: 'uploadId' });

module.exports = Photo;
