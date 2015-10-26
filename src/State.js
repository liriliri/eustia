'Emitter each isArray some';

var State = Emitter.extend({
    initialize: function (initial, events)
    {
        this.current = initial;

        var self = this;

        each(events, function (event, key)
        {
            self[key] = self.buildEvent(key, event);
        });
    },
    is: function (state)
    {
        return this.current = state;
    },
    buildEvent: function (name, event)
    {
        var from = event.from,
            to   = event.to;

        if (!isArray(from)) from = [from];

        return function ()
        {
            if (some(from, function (val) {return this.current === val}, this))
            {
                this.current = to;
                this.emit(name);
            }
        };
    }
});

exports = State;