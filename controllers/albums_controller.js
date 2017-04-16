var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var escapeStringRegexp = require('escape-string-regexp');
var dump = require('../helpers/dump_helper');
var multer = require("multer");

router.get('/', function(req, res, next) {
	req.breadcrumbs("Album");
	models.Album.findAll({
	}).then(function(albums){
			res.render(path.join('album','index'), {
				title: 'Albums',
				albums: albums,
				albums_active: "active",
				breadcrumbs: req.breadcrumbs(),
				user: req.user,
				new_album_path: "/albums/new"
			});
	})
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  	console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage });

upload = multer({
  dest: './uploads/',
  storage: storage
});

var validateFileUpload = function(req, res, next) {
	if(req.files == undefined) {
		return res.redirect('/albums/new');
	}
	if(req.files['album'] == undefined || req.files['album'][0] == undefined){
		return res.redirect('/albums/new');
	}
	var i = 0;
	for(var file in req.files) {
		i++;
	}
	if(i == 0) {
		return res.redirect('/albums/new');
	}
	next();
}

var cpUpload = upload.fields([{ name: 'album', maxCount: 1 }, { name: 'photos', maxCount: 8 }]);
router.post('/create', cpUpload, validateFileUpload, function(req, res, next) {
	console.log("--------- BODY --------------");
	console.log(req.files['album'][0]);
	var album = models.Album.create({
  	cover: req.files['album'][0].filename,
  	views: 0,
  	author: req.user.name
  }).then(function(thisAlbum){
  		if(req.files['photos']){
				var j = 0;
				var l = req.files['photos'].length;
				for(var j = 0 ; j < l ; j++) {
					var photo = models.Photo.create({
				  	photo: req.files['photos'][j].filename,
				  	views: 0,
				  	album_id: thisAlbum.id,
				  	author: req.user.name
				  });
				}
			}
			res.redirect("/albums/" + thisAlbum.id);
  });

});

router.get('/new', function(req, res, next) {
	res.render(path.join('album','new'), {
		breadcrumbs: req.breadcrumbs(),
		user: req.user,
		new_album_path: "/albums/new"
	});
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
			user: req.user,
			new_album_path: "/albums/new"
		});
	});
});

module.exports = router;
