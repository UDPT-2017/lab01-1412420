var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var escapeStringRegexp = require('escape-string-regexp');
var dump = require('../helpers/dump_helper');


router.get('/', function(req, res, next) {

	models.Post.findAll({
		include: [models.User]
	}).then(function(posts){
			res.render(path.join('post','index'), {
				title: 'Post',
				posts: posts,
				blogs_active: "active"
			});
	})
});

router.get('/:id', function(req, res, next) {
	var postId = escapeStringRegexp(req.params.id);
	models.Post.findOne({ 
		id: postId,
		include: [models.User]
	})
	.then(function(post){
		res.render(path.join('post','show'), {
			title: 'Post',
			post: post,
			blogs_active: "active"
		});
	})
});

module.exports = router;
