describe('isObj', function ()
{
    var isObj = _.isObj;

    it('object and function are objects', function ()
    {
        expect(isObj({})).to.be.true;
        expect(isObj(function () {})).to.be.true;
    });
});