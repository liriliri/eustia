describe('trim', function ()
{
    var trim = _.trim;

    it('trim spaces', function ()
    {
        expect(trim('  eustia  ')).to.equal('eustia');
    });

    it('trim chars', function ()
    {
        expect(trim('eustia', 'ea')).to.equal('usti');
    });
});

