'use strict';
var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is a required field'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'This is not a email'
        },
        notEmpty: {
          msg: 'Email is a required field'
        },
        isUnique: function (value, next) {
                    var self = this;
                    User.findOne({where: {email: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same email
                            if (user && self.id !== user.id) {
                                return next('Email already in use');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                  }
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is a required field"
        },
      }
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      validate: {
        equals: function (value, next) {
          var self = this;
          if(self.password != self.password_confirmation){
            return next('Password confirmation failed');
          }
          return next();
        }
      }
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Student id is a required field"
        },
      }
    },
    team_id: {
      type: DataTypes.INTEGER
    }
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
    },
    instanceMethods: {
      authenticate: function(value) {
        if (bcrypt.compareSync(value, this.password))
          return true;
        return false;
      }
    }
  });

  User.beforeValidate(function(user, options, fn) {
    user.email = user.email.toLowerCase();
    return fn(null, user);
  });

  User.beforeCreate(function(user, options, fn) {
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) return fn(err);
      user.set('password', hash);
      return fn(null, user);
    });
  });
  User.beforeUpdate(function(user, options, fn) {
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) return fn(err);
      user.set('password', hash);
      return fn(null, user);
    });
  });
  return User;
};