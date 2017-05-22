var express = require('express');
var router = express.Router();
var multer = require('multer');

var root = require('../uploads/root')
var path = require('path');
var utils = require('../Utils/utils');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Get Index Pug Template....');
    res.render('index', { title: 'Express' });
});


router.post('/upload',upload.single('file'), function (req, res, next) {
    console.log('Request /upload....');
    utils.processFile('/Users/jhgonzalez/Desktop/MyApp/ME/MeliFormatter/uploads/' + req.file.originalname)
    res.status(204).end()

})

module.exports = router;
