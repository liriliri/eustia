var _      = require('./util/node'),
    expect = require('expect.js');

var Emitter = _.Emitter;

describe('Emitter', function ()
{
    var emitter = new Emitter(),
        name    = '';

    function setName(n) { name = n }

    it('add setName listener', function ()
    {
        emitter.on('setName', setName);
    });

    it('emit setName with "eustia"', function ()
    {
        emitter.emit('setName', 'eustia');
        expect(name).to.be('eustia');
    });

    it('remove setName listener', function ()
    {
        emitter.off('setName', setName);
        emitter.emit('setName', 'eris');
        expect(name).to.be('eustia');
    });

    it('add setName listener and trigger once', function ()
    {
        emitter.once('setName', setName);
        emitter.emit('setName', 'licia');
        expect(name).to.be('licia');
        emitter.emit('setName', 'fione');
        expect(name).not.to.be('fione');
    });

    it('mixin an object with Emitter', function ()
    {
        var obj = {};
        Emitter.mixin(obj);
        obj.on('setName', setName);
        obj.emit('setName', 'eustia');
        expect(name).to.be('eustia');
    });
});