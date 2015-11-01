'Emitter each isArray some';

function buildEvent(name, event)
{
    var from = event.from,
        to   = event.to;

    if (!isArray(from)) from = [from];

    return function ()
    {
        var args = slice(arguments, 1);
        if (some(from, function (val) {return this.current === val}, this))
        {
            this.current = to;
            this.emit.apply(name, args);
        }
    };
}

var State = Emitter.extend({
    className: 'State',
    initialize: function (initial, events)
    {
        this.current = initial;

        var self = this;

        each(events, function (event, key)
        {
            self[key] = buildEvent(key, event);
        });
    },
    is: function (state)
    {
        return this.current = state;
    }
});

exports = State;