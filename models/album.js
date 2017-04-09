'use strict';
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
    cover: DataTypes.STRING,
    views: DataTypes.INTEGER,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Album.hasMany(models.Photo, {
          foreignKey: "album_id",
          onDelete: "CASCADE"
        });
      }
    }
  });
  return Album;
};