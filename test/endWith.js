describe('endWith', function ()
{
    var endWith = _.endWith;

    it('"eustia" ends with "tia"', function ()
    {
        expect(endWith('eustia', 'tia')).to.be.true;
    });

    it('"eustia" does not end with "ti"', function ()
    {
        expect(endWith('eustia', 'ti')).to.be.false;
    });
});