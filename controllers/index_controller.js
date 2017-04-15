var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {

	models.User.findAll({
		include: [ models.Post ]
	}).then(function(users){
			res.render(path.join('index','index'), {
		  	title: 'Photos',
		  	users: users,
		  	home_active: "active",
		  	breadcrumbs: req.breadcrumbs(),
		  	user: req.user
		 	});
		});
});


module.exports = router;
