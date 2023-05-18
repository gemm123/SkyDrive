const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const Upload = require('./upload');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
});

File.belongsTo(Upload, { as: 'upload', foreignKey: 'uploadId' });
Upload.hasOne(File, { foreignKey: 'uploadId' });

module.exports = File;
