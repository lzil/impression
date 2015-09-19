var express = require('express');
var router = express.Router();
//var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Impression' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
	res.render('test', { title: 'Test Page' });
});

/* POST to upload. */
router.post('/upload', function (req, res) {
	var db = req.db;
	db.collection('music-files').insert(req.body, function (err, result) {
		res.send(
			(err === null) ? {msg: ''} : {msg: err}
		);
	});
});

module.exports = router;
