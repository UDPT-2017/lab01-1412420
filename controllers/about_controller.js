var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var escapeStringRegexp = require('escape-string-regexp');
var dump = require('../helpers/dump_helper');

router.get('/', function(req, res, next) {
	req.breadcrumbs("About");
	models.Team.findOne({
		id: 1,
		include: [models.User]
	}).then(function(team){
		dump(team);
		res.render(path.join('about','index'), {
			title: 'About',
			team: team,
			about_active: "active",
			breadcrumbs: req.breadcrumbs(),
			user: req.user
		});
	});
	
});

module.exports = router;
