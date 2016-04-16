var request = require('request'),
    fs = require('fs');

var DOWNLOAD_URL_PREFIX = 'https://raw.githubusercontent.com/liriliri/eris/master/';

module.exports = function (modName, dest, cb) {
    var src = getSrc(modName);

    request({
        url: src,
        method: 'GET'
    }, function (err, res, body)
    {
        if (err) return cb(err);

        if (res.statusCode !== 200)
        {
            return cb('Error Downloading ' + modName + '.');
        }

        fs.writeFile(dest, body, 'utf-8', function (err)
        {
            if (err) return cb(err);

            cb();
        });
    });
};

function getSrc(modName)
{
    return DOWNLOAD_URL_PREFIX + modName[0].toLowerCase() + '/' + modName + '.js'
}