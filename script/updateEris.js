var request = require('request'),
    fs = require('fs');

var ERIS_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/eris.json';

request(ERIS_URL, function (err, res, body)
{
    fs.writeFile('cmd/share/eris.json', body, 'utf-8');
});