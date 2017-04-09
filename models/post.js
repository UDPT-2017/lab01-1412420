'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    view: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.User, {
          foreignKey: {
            name: 'user_id',
            allowNull: false
          }
        });
      }
    }
  });
  return Post;
};