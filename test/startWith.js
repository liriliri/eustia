var _      = require('./util/node'),
    expect = require('expect.js');

var startWith = _.startWith;

describe('startWith', function ()
{
    it('"eustia" starts with "eus"', function ()
    {
        expect(startWith('eustia', 'eus')).to.be(true);
    });

    it('"eustia" does not start with "us"', function ()
    {
        expect(startWith('eustia', 'us')).to.be(false);
    });
});