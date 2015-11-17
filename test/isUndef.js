describe('isUndef', function ()
{
    var isUndef = _.isUndef;

    it('void 0 is undefined', function ()
    {
        expect(isUndef(void 0)).to.be.true;
    });

    it('null is not undefined', function ()
    {
        expect(isUndef(null)).to.be.false;
    });
});