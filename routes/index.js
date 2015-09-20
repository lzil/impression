var express = require('express');
var router = express.Router();
var fs = require('fs-extra');

var clarifai = require('../clarifai_node.js');
clarifai.initAPI("89yQDnMpTdF6VlNKDEzttY3ObL9xIiUYU1tZS1Z-", "AA6jlbyBXSfuw8y9cOoQYlfWNKvqf0g7GhjD-Ir5" );

//var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Impression' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
	res.render('test', { title: 'Test Page' });
});

router.get('/results', function(req, res, next) {
    clarifyCall();
    res.render('results', { title: 'Impression', searchUrl: 'http://www.clarifai.com/img/metro-north.jpg'});
});


/* POST to upload. */
router.post('/upload', function (req, res, next) {
/*        fs.unlink('./public/img/img.jpg', function (err) {
            if (err) throw err;
            console.log('successfully deleted img.jpg');
        });*/
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file) {
            console.log("Uploading: " + 'img.jpg');
            fstream = fs.createWriteStream('./public/images/' + 'img.jpg');
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + 'img.jpg');              
                res.redirect('back');
            });
        });
});

function clarifyCall() {
    var testImageURL = 'https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg';
    var ourId = "train station 1"; // this is any string that identifies the image to your system

    clarifai.tagURL( testImageURL , ourId, function(err, res) {console.log(res.results[0].result.tag.classes)} );
}

module.exports = router;
