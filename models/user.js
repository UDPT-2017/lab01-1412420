'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Team, {
          foreignKey: 'team_id'
        });
        User.hasMany(models.Post, {
          onDelete: "CASCADE",
          foreignKey: 'user_id'
        });
      }
    }
  });
  return User;
};