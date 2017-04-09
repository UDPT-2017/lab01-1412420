var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.User.findAll({
		include: [ models.Post ]
	}).then(function(users){
			console.log(users);
			res.render(path.join('index','index'), {
		  	title: 'Express',
		  	users: users
		 	});
		});
});

module.exports = router;
