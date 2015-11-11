var _      = require('./util'),
    expect = require('expect.js');

var isStr = _.isStr;

describe('isStr', function ()
{
    it('"eustia" is string, number is not', function ()
    {
        expect(isStr('eustia')).to.be(true);
        expect(isStr(5)).to.be(false);
    });
});