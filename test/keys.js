describe('keys', function ()
{
    var keys = _.keys;

    var obj = Object.create({c: 2});

    obj.a = 0;
    obj.b = 1;

    it('{a:0, b:1} with prototype {c:2} has key a and b', function ()
    {
        expect(keys(obj)).to.eql(['a', 'b']);
    });
});