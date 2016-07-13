var util = require('../../lib/util'),
    logger = require('../../lib/logger');

var resultTpl = '{{idx}}.{{#cyan}}{{name}}{{/cyan}}: {{desc}}\nSource: {{src}}';

module.exports = function (foundMods, cb)
{
    var len = foundMods.length;

    if (len === 0)
    {
        logger.log('Nothing is found:(');
    } else
    {
        if (len > 1) logger.log(len + ' results is found.');

        util.each(foundMods, function (mod, idx)
        {
            mod.idx = idx + 1;
            logger.tpl(mod, resultTpl);
        });
    }

    cb();
};