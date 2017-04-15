'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    student_id: DataTypes.STRING,
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