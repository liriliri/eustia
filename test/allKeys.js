describe('allKeys', function ()
{
    var allKeys = _.allKeys;

    var obj = Object.create({ a: 0 });

    it('obj with prototype {a:0} has key a', function ()
    {
        expect(allKeys(obj)).to.contain('a');
    });
});