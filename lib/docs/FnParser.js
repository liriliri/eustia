var _      = require('../../lib/util'),
    marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'language-'
});

var Parser = require('./Parser');

module.exports = Parser.extend({
    parse: function ()
    {
        var c;

        while (!this.eof())
        {
            c = this.c;

            if (this.state == 'name')
            {
                this.name();
                continue;
            }

            if (this.state == 'desc')
            {
                this.desc();
                continue;
            }

            if (this.state == 'param')
            {
                this.param();
                continue;
            }

            if (this.state == 'detail')
            {
                this.detail();
                continue;
            }

            this.consume();
        }

        return this.result;
    },
    detail: function ()
    {
        var val = '';

        while (!this.eof())
        {
            val += this.c;
            this.forward();
        }

        val = _.trim(val);

        if (val !== '') this.result.detail = marked(val);
    },
    desc: function ()
    {
        var val = '';

        while (!(this.equal('\n')))
        {
            val += this.c;
            this.forward();
            if (this.eof()) break;
        }

        this.consume();

        this.result.desc = _.trim(val);

        this.state = 'param';
    },
    name: function ()
    {
        var val = '';

        while (!(this.equal(':')))
        {
            val += this.c;
            this.forward();
            if (this.eof()) break;
        }

        this.consume();

        this.result.name = _.trim(val);

        this.state = 'desc';
    },
    param: function ()
    {
        var regParam = /(.+)\((.+)\):(.+)/;

        var lineEndPos = this.input.indexOf('\n', this.i);
        if (lineEndPos < 0) lineEndPos = this.length - 1;

        var nextLine = this.input.substring(this.i, lineEndPos);

        if (_.trim(nextLine) === '')
        {
            this.forward(nextLine.length);
            this.consume();
            return;
        }

        var matchResult = nextLine.match(regParam);

        if (!matchResult) return this.state = 'detail';

        this.forward(nextLine.length);
        this.consume();

        var name = _.trim(matchResult[1]),
            type = _.trim(matchResult[2]),
            desc = _.trim(matchResult[3]);

        if (name === 'return')
        {
            return this.result.return = {
                type: type,
                desc: desc
            };
        }

        var params = this.result.params || [];

        params.push({
            name: name,
            type: type,
            desc: desc
        });

        this.result.params = params;
    }
});