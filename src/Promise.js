'Class State isFunction isObject each';

function getThen(val)
{
    if (val && (isObject(val) || isFunction(val)))
    {
        var then = val.then;
        if (isFunction(then)) return then;
    }

    return null;
}

function doResolve(fn, onFulfilled, onRejected)
{
    var done = false;

    try
    {
        fn(function (val)
        {
            if (done) return;
            done = true;
            onFulfilled(val);
        }, function (err)
        {
            if (done) return;
            done = true;
            onRejected(err);
        });
    } catch (e)
    {
        if (done) return;
        done = true;
        onRejected(e);
    }
}

var Promise = Class({
    initialize: function (fn)
    {
        this._state = new State('pending', {
            fulfill: {
                from: 'pending',
                to  : 'fulfilled'
            },
            reject: {
                from: 'pending',
                to  : 'rejected'
            }
        });
        this._value    = null;
        this._handlers = [];

        var self = this;

        this._state.on('fulfill', function (result)
        {
            self._value = result;
            each(self._handlers, self._handle, this);
            self._handlers = null;
        }).on('reject', function (err)
        {
            self._value = err;
            each(self._handlers, self._handle, this);
            self._handlers = null;
        });

        doResolve(fn, function ()
        {

        })
    },
    _handle: function (handler)
    {
        var state = this._state,
            value = this._value;

        if (state.is('pending'))
        {
            this._handlers.push(handler);
        } else
        {
            if (state.is('fulfilled') &&
                isFunction(handler.onFulfilled))
            {
                handler.onFulfilled(value);
            }
            if (state.is('rejected') &&
                isFunction(handler.onRejected))
            {
                handler.onRejected(value);
            }
        }
    },
    _resolve: function (result)
    {

    },
    done: function (onFulfilled, onRejected)
    {
        var self = this;

        setTimeout(function ()
        {
            self._handle({
                onFulfilled: onFulfilled,
                onRejected : onRejected
            });
        }, 0)
    },
    then: function (onFulfilled, onRejected)
    {

    }
});