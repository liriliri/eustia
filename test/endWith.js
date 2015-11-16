var _      = require('./util/node'),
    expect = require('expect.js');

var endWith = _.endWith;

describe('endWith', function ()
{
    it('"eustia" ends with "tia"', function ()
    {
        expect(endWith('eustia', 'tia')).to.be(true);
    });

    it('"eustia" does not end with "ti"', function ()
    {
        expect(endWith('eustia', 'ti')).to.be(false);
    });
});