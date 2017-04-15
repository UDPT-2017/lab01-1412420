var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var escapeStringRegexp = require('escape-string-regexp');
var dump = require('../helpers/dump_helper');


router.get('/', function(req, res, next) {
	req.breadcrumbs("Album");
	models.Album.findAll({
	}).then(function(albums){
			res.render(path.join('album','index'), {
				title: 'Albums',
				albums: albums,
				albums_active: "active",
				breadcrumbs: req.breadcrumbs(),
				user: req.user
			});
	})
});

router.get('/:id', function(req, res, next) {
	var albumId = escapeStringRegexp(req.params.id);
	req.breadcrumbs([{name: "Album", url: "/albums"},{name: albumId }]);
	models.Photo.findAll({
		where: { album_id: albumId}
	}).then(function(photos){
		res.render(path.join('album','show'), {
			title: 'Photos',
			photos: photos, 
			albums_active: "active",
			breadcrumbs: req.breadcrumbs(),
			user: req.user
		});
	});
});

module.exports = router;
