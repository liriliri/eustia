var _      = require('./util/node'),
    expect = require('expect.js');

var isFn = _.isFn;

describe('isFn', function ()
{
    it('function is function, object is not', function ()
    {
        expect(isFn(function () {})).to.be(true);
        expect(isFn({})).to.be(false);
    });
});