describe('startWith', function ()
{
    var startWith = _.startWith;

    it('"eustia" starts with "eus"', function ()
    {
        expect(startWith('eustia', 'eus')).to.be.true;
    });

    it('"eustia" does not start with "us"', function ()
    {
        expect(startWith('eustia', 'us')).to.be.false;
    });
});