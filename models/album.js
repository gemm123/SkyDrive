// models/Album.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const Photo = require('./photo');

const Album = sequelize.define('Album', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Album.belongsToMany(Photo, { through: 'AlbumPhoto', foreignKey: 'albumId', otherKey: 'photoId' });
Photo.belongsToMany(Album, { through: 'AlbumPhoto', foreignKey: 'photoId', otherKey: 'albumId' });

module.exports = Album;
