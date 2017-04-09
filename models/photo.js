'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    photo: DataTypes.STRING,
    views: DataTypes.INTEGER,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.Album, {
          foreignKey: {
            name: "album_id",
            allowNull: false
          }
        });
      }
    }
  });
  return Photo;
};