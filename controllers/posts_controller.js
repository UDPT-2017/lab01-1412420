var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var escapeStringRegexp = require('escape-string-regexp');
var dump = require('../helpers/dump_helper');


router.get('/', function(req, res, next) {
	req.breadcrumbs("Blogs");
	models.Post.findAll({
		include: [models.User]
	}).then(function(posts){
			res.render(path.join('post','index'), {
				title: 'Post',
				posts: posts,
				blogs_active: "active",
				breadcrumbs: req.breadcrumbs()
			});
	})
});

router.get('/:id', function(req, res, next) {
	var postId = escapeStringRegexp(req.params.id);
	req.breadcrumbs([{name: "Blogs", url: "/posts"},{name: postId }]);
	models.Post.findOne({ 
		id: postId,
		include: [models.User]
	})
	.then(function(post){
		res.render(path.join('post','show'), {
			title: 'Post',
			post: post,
			blogs_active: "active",
			breadcrumbs: req.breadcrumbs()
		});
	})
});

module.exports = router;
