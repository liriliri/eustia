var _      = require('./util/node'),
    expect = require('expect.js');

var rtrim = _.rtrim;

describe('rtrim', function ()
{
    it('trim spaces', function ()
    {
        expect(rtrim(' eustia  ')).to.be(' eustia');
    });

    it('trim chars', function ()
    {
        expect(rtrim('eustia', 'ea')).to.be('eusti');
    });
});