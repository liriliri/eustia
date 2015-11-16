var _      = require('./util/node'),
    expect = require('expect.js');

var isNum = _.isNum;

describe('isNum', function ()
{
    it('5 is number, string is not', function ()
    {
        expect(isNum(5)).to.be(true);
        expect(isNum('eustia')).to.be(false);
    });
});