describe('cookie', function ()
{
    var Cookie = _.Cookie;

    it('set and get', function ()
    {
        Cookie.set('name', 'eustia');
        expect(Cookie.get('name')).to.equal('eustia');
    });

    it('remove', function ()
    {
        Cookie.remove('name');
        expect(Cookie.get('name')).to.equal(undefined);
    });
});