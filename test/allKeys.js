var _      = require('./util/node'),
    expect = require('expect.js');

var allKeys = _.allKeys;

describe('allKeys', function ()
{
    var obj = Object.create({ a: 0 });

    it('obj with prototype {a:0} has key a', function ()
    {
        expect(allKeys(obj)).to.contain('a');
    });
});