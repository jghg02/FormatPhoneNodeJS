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
  res.render('index', { title: 'Express' });
});


router.post('/upload',upload.single('file'), function (req, res, next) {
    utils.processFile('/Users/jhgonzalez/Desktop/MyApp/ME/MeliFormatter/uploads/' + req.file.originalname)
    res.status(204).end()

})

app.get('/:file(*)', function(req, res, next){
    var file = req.params.file
        , path = __dirname + '/files/' + file;

    res.download(path);
});

module.exports = router;
