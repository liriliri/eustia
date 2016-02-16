var _ = require('../../lib/util');

var resultTpl = '{{idx}}.{{#cyan}}{{name}}{{/cyan}}: {{desc}}\nSource: {{src}}';

module.exports = function (foundUtils, cb)
{
    var len = foundUtils.length;

    if (len === 0)
    {
        _.log('Nothing is found:(');
    } else
    {
        if (len > 1) _.log(len + ' results is found.');

        _.each(foundUtils, function (utility, idx)
        {
            utility.idx = idx + 1;
            _.log(utility, resultTpl);
        });
    }

    cb();
};