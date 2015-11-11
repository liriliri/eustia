var _      = require('./util'),
    expect = require('expect.js');

var isObj = _.isObj;

describe('isObj', function ()
{
    it('object and function are objects', function ()
    {
        expect(isObj({})).to.be(true);
        expect(isObj(function () {})).to.be(true);
    });
});