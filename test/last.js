describe('last', function ()
{
    var last = _.last;

    it('last element of [1, 2] is 2', function ()
    {
        expect(last([1, 2])).to.equal(2);
    });
});