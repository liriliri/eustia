var request = require('request'),
    fs = require('fs');

var DOWNLOAD_URL_PREFIX = 'https://raw.githubusercontent.com/liriliri/eris/master/';

module.exports = function (modName, dest, cb)
{
    var src = getSrc(modName);

    request.get(src)
           .on('response', function (res)
           {
               var status = res.statusCode;

               if (status < 200 || status >= 300) cb('Error downloading ' + src);
           })
           .pipe(fs.createWriteStream(dest))
           .on('close', function () { cb() })
           .on('error', function (err) { cb(err) });
};

function getSrc(modName)
{
    return DOWNLOAD_URL_PREFIX + modName[0].toLowerCase() + '/' + modName + '.js'
}