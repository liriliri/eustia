var nopt = require('nopt'),
    _    = require('./lib/util'),
    cmd  = require('./lib/cmd'),
    path = require('path');

var defOpts =
{
    cwd     : process.cwd(),
    dirname : __dirname,
    files   : [],
    cmd     : 'help',
    packInfo: require('./package.json')
};

var knowOpts = {
    encoding: String,
    output  : String,
    name    : String,
    exclude : String
};

var shortHands = {
    o: '--output',
    e: '--encoding',
    n: '--name'
};

var options = _.extend(defOpts, nopt(knowOpts, shortHands, process.argv, 2));

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

cmd = cmd[options.cmd];

cmd(_.extend(cmd.defOpts, options));

