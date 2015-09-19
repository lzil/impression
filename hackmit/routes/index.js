var express = require('express');
var router = express.Router();
var request = require('resquest');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Impression' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
	request.post(
    'http://www.yoursite.com/formpage',
    { form: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
	res.render('test', { title: 'Test Page' });
});

module.exports = router;
