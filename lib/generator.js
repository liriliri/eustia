var file = require('./file');

var exports = {};

function scanFiles(files, callback)
{
    file.readFiles(files, function (file)
    {

    }, function ()
    {

    });
}

exports.exec = function (options)
{
    scanFiles(options.files);
};

module.exports = exports;