var _ = require('../../lib/util');

const EOF = 'EndOfFile';

module.exports = _.Class({
    initialize: function (input)
    {
        this.input  = input;
        this.length = input.length;
        this.i      = 0;
        this.c      = (input.length === 0 ? EOF : input[0]);
        this.state  = 'name';
        this.result = {};
    },
    eof: function ()
    {
        return this.c == EOF;
    },
    parse: function ()
    {
        return this.result;
    },
    whiteSpace: function ()
    {
        while (this.isEmpty()) this.forward();
    },
    isEmpty: function ()
    {
        var c = this.c;

        return c === ' ' || c === '\t' || c === '\r' || c === '\n';
    },
    consume: function (num)
    {
        num = num || 1;

        while (num--)
        {
            this.forward();
            this.whiteSpace();
        }
    },
    equal: function (str)
    {
        return this.c === str[0];
    },
    forward: function (num)
    {
        if (this.c == EOF) return;

        num = num || 1;

        while (num--)
        {
            this.i++;

            this.c = this.i >= this.length ? EOF : this.input[this.i];
        }
    }
});