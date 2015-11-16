var _      = require('./util/node'),
    expect = require('expect.js');

var ltrim = _.ltrim;

describe('ltrim', function ()
{
    it('trim spaces', function ()
    {
        expect(ltrim(' eustia  ')).to.be('eustia  ');
    });

    it('trim chars', function ()
    {
        expect(ltrim('eustia', 'ea')).to.be('ustia');
    });
});