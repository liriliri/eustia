var request = require('request'),
    fs = require('fs');

var logger = require('./logger');

var DOWNLOAD_URL_PREFIX = 'https://raw.githubusercontent.com/liriliri/eris/master/';

module.exports = function (modName, dest, cb)
{
    var src = getSrc(modName);

    logger.tpl({
        modName: modName,
        src: src
    }, 'DOWNLOAD {{#cyan}}{{{modName}}}{{/cyan}} FROM {{{src}}}');

    request({
        url: src,
        method: 'GET'
    }, function (err, res, body)
    {
        if (err) return cb(err);

        switch (res.statusCode)
        {
            case 200:
                break;
            case 404:
                return cb(new Error('There is no module named "' + modName + '"'));
            default:
                return cb(new Error('Error Downloading ' + modName));
        }

        fs.writeFile(dest, body, 'utf8', function (err)
        {
            cb(err);
        });
    });
};

function getSrc(modName)
{
    return DOWNLOAD_URL_PREFIX + modName[0].toLowerCase() + '/' + modName + '.js'
}