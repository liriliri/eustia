var nopt = require('nopt'),
    _    = require('./lib/util'),
    cmd = require('./lib/cmd'),
    path = require('path');

var defOpts =
{
    cwd     : process.cwd(),
    dirname : __dirname,
    files   : [],
    cmd     : 'help',
    packInfo: require('./package.json'),
    encoding: 'utf-8'
};

var options = {};

var knowOpts = {
    encoding: String,
    out     : String
};

var shortHands = {
    o: '--out',
    e: '--encoding'
};

options = _.extend(defOpts, nopt(knowOpts, shortHands, process.argv, 2));

var remain = options.argv.remain;

for (var i = 0, len = remain.length; i < len; i++)
{
    if (_.has(cmd, remain[i]))
    {
        options.cmd = remain[i];
        remain.splice(i, 1);
        break;
    }
}

if (options.cmd === 'generate')
{
    options.files = remain;

    _.each(options.files, function (val, idx)
    {
        options.files[idx] = path.resolve(options.cwd, val);
    });
}

cmd[options.cmd](options);

