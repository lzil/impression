var express = require('express');
var router = express.Router();
//var request = require('request');

// File System Stuff
var fs = require('fs-extra');

// Clarifai Stuff
var clarifai = require('../clarifai_node.js');
var key1 = "89yQDnMpTdF6VlNKDEzttY3ObL9xIiUYU1tZS1Z-";
var key2 = "AA6jlbyBXSfuw8y9cOoQYlfWNKvqf0g7GhjD-Ir5";
clarifai.initAPI(key1, key2);


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Impression' });
});

/* POST to upload. */
router.post('/upload', function (req, res, next) {
    var fstream;

    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file) {
        fstream = fs.createWriteStream('./public/images/' + 'img.jpg');
        file.pipe(fstream);
        fstream.on('close', function () {    
            res.redirect('results')
        });
    });
});

/* GET results page */
router.get('/results', function (req, res, next) {
    
    var imageurl = 'http://much-impression.herokuapp.com/images/img.jpg';
    var ourId = "uploaded image";
    clarifai.tagURL( imageurl , ourId, function (err, res2) {
        cResults = res2.results[0].result.tag.classes;
        var data = {
            title: 'Impression',
            cResults: cResults,
        };
        res.render('results');
    });
});

/* GET test page. */
router.get('/test', function (req, res, next) {
    res.render('test', { title: 'Test Page' });
});

/* GET musictest page. */
router.get('/musictest', function (req, res, next) {
    res.render('musictest', { title: 'Music Test' });
    
});

module.exports = router;
