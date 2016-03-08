var _ = require('../../lib/util');

var resultTpl = '{{idx}}.{{#cyan}}{{name}}{{/cyan}}: {{desc}}\nSource: {{src}}';

module.exports = function (foundMods, cb)
{
    var len = foundMods.length;

    if (len === 0)
    {
        _.log('Nothing is found:(');
    } else
    {
        if (len > 1) _.log(len + ' results is found.');

        _.each(foundMods, function (mod, idx)
        {
            mod.idx = idx + 1;
            _.log(mod, resultTpl);
        });
    }

    cb();
};