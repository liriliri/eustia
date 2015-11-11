var _      = require('./util'),
    expect = require('expect.js');

var keys = _.keys;

describe('keys', function ()
{
    var obj = Object.create({c: 2});

    obj.a = 0;
    obj.b = 1;

    it('{a:0, b:1} with prototype {c:2} has key a and b', function ()
    {
        expect(keys(obj)).to.eql(['a', 'b']);
    });
});