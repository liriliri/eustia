describe('lpad', function ()
{
    var lpad = _.lpad;

    it('add chars to the left if length is < minLength', function ()
    {
        expect(lpad('ab', 0, '-')).to.equal('ab');
        expect(lpad('ab', 4, '-')).to.equal('--ab');
    });
});