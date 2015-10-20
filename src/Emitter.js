'Class has each slice inherits';

var Emitter = Class({
    initialize: function ()
    {
        this._events = this._events || {};
    },
    on: function (event, listener)
    {
        this._events[event] = this._events[event] || [];
        this._events[event].push(listener);
    },
    off: function (event, listener)
    {
        if (!has(this._events, event)) return;

        this._events[event].splice(this._events[event].indexOf(listener), 1);
    },
    once: function (event, listener)
    {
        var fired = false;

        function g()
        {
            this.off(event, g);
            if (!fired)
            {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        this.on(event, g);
    },
    emit: function (event)
    {
        if (!has(this._events, event)) return;

        var args = slice(arguments, 1);

        each(this._events[event], function (val)
        {
            val.apply(this, args);
        }, this);
    }
}, {
    mixin: function (obj)
    {
        each(['on', 'off', 'once', 'emit'], function (val)
        {
            obj[val] = Emitter.prototype[val];
        });

        obj._events = obj._events || {};
    }
});

exports = Emitter;