describe('keys', function ()
{
    var keys = _.keys;

    it('get object keys', function ()
    {
        expect(keys({
            zero: 0,
            one: 1
        })).to.eql(['zero', 'one']);
    });

    it('do not get keys on object prototypes', function ()
    {
        expect(keys(Object.create({two: 2}))).to.eql([]);
    });

    it('throw error if not object', function ()
    {
        expect(keys.bind(1)).to.throw(Error);
        expect(keys.bind('eustia')).to.throw(Error);
    });
});