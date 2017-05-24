/**
 * Created by jhgonzalez on 5/20/17.
 */
var http = require('http');

// Phone number formatters
var googleLibPhoneNumber = require('google-libphonenumber')
var PhoneNumberFormat = googleLibPhoneNumber.PhoneNumberFormat;
var phoneNumberUtil = googleLibPhoneNumber.PhoneNumberUtil.getInstance();

var fileExtension = '.txt'
var folderUploads = 'uploads/'

function processFile(fileName, path) {
    pathFile = path + fileName
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(path + fileName),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        var line = line.split(' ');
        formatPhone(line[0], line[1], line[2], path, fileName, fs)
    });

    rl.on('close', function (line) {
        console.log('done reading file.');
        //download(inputFile)
    });
}

function formatPhone(countryCode, areCode, phone, path, fileName, fs) {
    outPutFile(_processNumber(areCode,phone,countryCode, null) + '\r',path, fileName, fs)
}

/**
 * Check if a phone number needs an international format
 * @param vertical
 * return
 */
function _isInternationalPhoneFormatEnabled(vertical) {
    return true;
}

/**
 * Remove non-numeric chars from number
 * @param number
 * @returns sanitized number
 * @private
 */
function _clearNumber(number){
    var formatted = "";
    if (number) {
        formatted = number.replace(/[^0-9]+/g, "")
    }
    return formatted
}


/**
 * Returns the phone number normalized using international format
 * @param areaCode
 * @param phoneNumber
 * @param country
 * @param vertical
 * @returns {*}
 * @private
 */
function _processNumber(areaCode, phoneNumber, country, vertical) {
    console.log('se esta procesando el numero para realizar el formateo');
    if (phoneNumber) {
        if (_isInternationalPhoneFormatEnabled(vertical)) {
            try {
                return _phoneNumberWithInternationalFormat(areaCode, phoneNumber, country);
            } catch (error) {
                return _phoneNumberWithoutFormat(areaCode, phoneNumber);
            }
        } else {
            // keep old format
            return _phoneNumberWithoutFormat(areaCode, phoneNumber);
        }
    }
}


function _phoneNumberWithInternationalFormat(areaCode, phoneNumber, country) {
    // cleanup areacode and number
    var cleanAreaCode = _clearNumber(areaCode)
    var cleanPhoneNumber = _clearNumber(phoneNumber)
    var fullNumber = cleanAreaCode + cleanPhoneNumber;

    // Parse using lib
    var parsedNumber = phoneNumberUtil.parse(fullNumber, country);
    var formattedNumber = phoneNumberUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);

    if(formattedNumber == fullNumber) {
        formattedNumber = _safePhoneFormat(cleanAreaCode, cleanPhoneNumber)
    }

    return formattedNumber;
}

function _phoneNumberWithoutFormat(areaCode, phoneNumber) {
    return (areaCode != null ? areaCode + ' ' : '') + phoneNumber;
}

function outPutFile(data, path, fileName, fs) {
    // Name of file to save result
    //path = path + fileName.substr(0,fileName.indexOf('.')) + getRandomInt(0,100) + fileExtension
    path = path + fileName.substr(0,fileName.indexOf('.')) + new Date().getDate() + fileExtension
    fs.appendFile(path, data, function(err) {
        if(err) {
            return console.log(err);
        }
    });

    console.log("The file was saved!");
}

function download(url, cb) {
    var data = "";
    var request = require("http").get(url, function(res) {

        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            cb(data);
        })
    });

    request.on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.processFile = processFile;
exports.getRandomArbitrary = getRandomArbitrary;
exports.getRandomInt = getRandomInt;
exports.fileExtension = fileExtension;
exports.folderUploads = folderUploads;