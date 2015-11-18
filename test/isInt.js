describe('isInt', function ()
{
    var isInt = _.isInt;

    it('5 is integer, 5.1 is not', function ()
    {
        expect(isInt(5)).to.be.true;
        expect(isInt(5.1)).to.be.false;
    });
});