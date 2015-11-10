var _ = require('./util.js'),
    expect = require('expect.js');

describe('Emitter', function ()
{
    var Emitter = _.Emitter;

    var emitter   = new Emitter(),
        character = '';

    function setCharacter(name) { character = name }

    describe('#on()', function ()
    {
        it('add setCharacter listener', function ()
        {
            emitter.on('setCharacter', setCharacter);
        });
    });

    describe('#emit()', function ()
    {
        it('emit setCharacter with eustia', function ()
        {
            emitter.emit('setCharacter', 'eustia');
            expect(character).to.be('eustia');
        });
    });

    describe('#off()', function ()
    {
        it('remove setCharacter listener', function ()
        {
            emitter.off('setCharacter', setCharacter);
            emitter.emit('setCharacter', 'eris');
            expect(character).to.be('eustia');
        });
    });

    describe('#once()', function ()
    {
        it('add setCharacter listener and trigger once', function ()
        {
            emitter.once('setCharacter', setCharacter);
            emitter.emit('setCharacter', 'licia');
            expect(character).to.be('licia');
            emitter.emit('setCharacter', 'fione');
            expect(character).not.to.be('fione');
        });
    });
});

describe('Object', function ()
{
    describe('#has()', function ()
    {
        var has = _.has,
            obj = { a: 0 };

        it('checks if key is a direct property', function ()
        {
            expect(has(obj, 'a')).to.be(true);
            expect(has(obj, 'b')).to.be(false);
            expect(has(obj, 'toString')).to.be(false);
        });
    });

    describe('#isBool()', function ()
    {
        var isBool = _.isBool;

        it('determine value is boolean or not', function ()
        {
            expect(isBool(true)).to.be(true);
            expect(isBool(false)).to.be(true);
            expect(isBool(5)).to.be(false);
        });
    });

    describe('#isFn()', function ()
    {
        var isFn = _.isFn;

        it('determine value is function or not', function ()
        {
            expect(isFn(function () {})).to.be(true);
            expect(isFn({})).to.be(false);
        });
    });

    describe('#isNum()', function ()
    {
        var isNum = _.isNum;

        it('determine value is number or not', function ()
        {
            expect(isNum(5)).to.be(true);
            expect(isNum('eustia')).to.be(false);
        });
    });

    describe('#isObj()', function ()
    {
        var isObj = _.isObj;

        it('determine value is number or not', function ()
        {
            expect(isObj({})).to.be(true);
            expect(isObj(function () {})).to.be(true);
            expect(isObj(5)).to.be(false);
        });
    });

    describe('#isStr()', function ()
    {
        var isStr = _.isStr;

        it('determine value is number or not', function ()
        {
            expect(isStr('eustia')).to.be(true);
            expect(isStr(5)).to.be(false);
        });
    });

    describe('#keys()', function ()
    {
        var keys = _.keys;

        it('get enumerable property names of object', function ()
        {
            expect(keys({ a: 0, b: 1 })).to.eql(['a', 'b']);
            expect(keys({})).to.eql([]);
        });
    });
});