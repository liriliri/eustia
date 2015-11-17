describe('invert', function ()
{
    var invert = _.invert;

    it('{a:0, b:1} inverted to be {0:a, 1:b}', function ()
    {
        expect(invert({a: 0, b:1})).to.eql({0: 'a', 1: 'b'});
    });
});