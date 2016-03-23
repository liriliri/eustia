var request = require('request'),
    path = require('path'),
    fs = require('fs'),
    _ = require('../../lib/util');

var DOWNLOAD_PATH = 'https://raw.githubusercontent.com/liriliri/eris/master/eris.json',
    ERIS_PATH = path.resolve(__dirname, '../share/eris.json');

module.exports = function (options, cb)
{
    if (!options.update) return cb(null, require('../share/eris.json'));

    _.log('Updating eris.json:');

    request.get(DOWNLOAD_PATH)
        .on('response', function (res)
        {
            var status = res.statusCode;

            if (status < 200 || status >= 300)
            {
                return cb('Error downloading eris.json: ' + status);
            }
        })
        .pipe(fs.createWriteStream(ERIS_PATH))
        .on('close', function ()
        {
            _.log.ok('Updated successfully!');
            fs.readFile(ERIS_PATH, 'utf-8', function (err, data)
            {
                if (err) return cb(err);
                cb(null, JSON.parse(data));
            });
        })
        .on('error', function (err) { cb(err) });
};