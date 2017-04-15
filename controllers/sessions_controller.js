var express = require('express');
var router = express.Router();

var passportLocal = require('../auth/local');

router.get('/signup', function(req, res, next){
	res.send("HHAAHAHAH");
});


router.post('/login', function(req, res, next) {
  passportLocal.authenticate('local', function(err, user, info) {
    switch (req.accepts('html', 'json')) {
      case 'html':
        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
        break;
      case 'json':
        if (err)  { return next(err); }
        if (!user) { return res.send({"ok": false}); }
        req.logIn(user, function(err) {
          if (err) { return res.send({"ok": false}); }
          return res.send({"ok": true, "user": user});
        });
        break;
      default:
        res.status(406).send();
    }
  })(req, res, next);    
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
