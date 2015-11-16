var _      = require('./util/node'),
    expect = require('expect.js');

var trim = _.trim;

describe('trim', function ()
{
    it('trim spaces', function ()
    {
        expect(trim('  eustia  ')).to.be('eustia');
    });

    it('trim chars', function ()
    {
        expect(trim('eustia', 'ea')).to.be('usti');
    });
});

