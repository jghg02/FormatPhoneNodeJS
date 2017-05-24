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
    res.render('index', { title: 'Express' , url: '/download'});
});


router.post('/upload',upload.single('file'), function (req, res, next) {
    //Folder to save all files
    // get name of file
    var fileName = req.file.originalname.substr(0,req.file.originalname.indexOf('.')) + utils.fileExtension;
    utils.processFile(fileName, utils.folderUploads)

    res.redirect('/download/'+utils.getFileNameToDownload(fileName))
    res.status(204).end()

})

router.get('/download/:name', function (req, res) {
    res.download(utils.folderUploads + req.params.name)

})

module.exports = router;
