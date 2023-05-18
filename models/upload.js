// models/Upload.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const User = require('./user');

const Upload = sequelize.define('Upload', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Upload.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Upload, { foreignKey: 'userId' });

module.exports = Upload;
