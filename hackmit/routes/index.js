var express = require('express');
var router = express.Router();
var fs = require('fs-extra'); 
//var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Impression' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
	res.render('test', { title: 'Test Page' });
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
            fstream = fs.createWriteStream('./public/img/' + 'img.jpg');
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + 'img.jpg');              
                res.redirect('back');
            });
        });
});
module.exports = router;
