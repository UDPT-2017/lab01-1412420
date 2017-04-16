var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models').User
  , init = require('./init');
// Use local strategy to create user account
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function(username, password, done) {
    User.findOne({ where: { email: username }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }, function(err){
      done(err);
    });
  }
));

init();

module.exports = passport;