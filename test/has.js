var _      = require('./util/node'),
    expect = require('expect.js');

var has = _.has;

describe('has', function ()
{
    var has = _.has,
        obj = Object.create({ a: 0});

    obj.b = 1;

    it('{b:1} with prototype {a:0} has b, but no a', function ()
    {
        expect(has(obj, 'a')).to.be(false);
        expect(has(obj, 'b')).to.be(true);
    });
});