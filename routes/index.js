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
    //var testImageURL = 'much-impression.herokuapp.com/images/img.jpg';
    var imageurl = 'http://shoot4stars.herokuapp.com/images/lastpage.png'
    console.log(imageurl)
    var ourId = "uploaded image";

    clarifai.tagURL( testImageURL , ourId, function(err, res2) {
        cResults = res2.results[0].result.tag.classes;
        console.log(cResults)
        res.render('results', { title: 'Impression', cResults: cResults, sResults: {'s1': {'title': 'etrnity', 'artist': 'vixx'}, 's2': {'title': 'lucifer', 'artist': 'exo'}}});
    });
    
});

/* GET musictest page. */
router.get('/musictest', function (req, res, next) {
    res.render('musictest', { title: 'Music Test' });
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
                res.redirect('results')
            });
        });
});

function clarifyCall() {
    var testImageURL = 'https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg';
    var ourId = "train station 1"; // this is any string that identifies the image to your system

    clarifai.tagURL( testImageURL , ourId, function(err, res) {console.log(res.results[0].result.tag.classes)} );
}


///////////////////////////////////////////////////////////////////////////////////



module.exports = router;
