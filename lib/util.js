(function ()
{
    var _ = {};

    typeof module !== 'undefined' && module.exports ? module.exports = _
                                                    : window._ = _;

    function define(name, requires, method)
    {
        _[name] = {
            requires: requires,
            body    : method
        };
    }

    function init(methods)
    {
        for (var i = 0, len = methods.length; i < len; i++) require(methods[i]);
    }

    var requireMarks = {};

    function require(name)
    {
        if (requireMarks.hasOwnProperty(name)) return _[name];

        var requires = _[name].requires,
            body     = _[name].body;

        for (var i = 0, len = requires.length; i < len; i++)
        {
            requires[i] = require(requires[i]);
        }

        _[name] = body.apply(_, requires);

        requireMarks[name] = true;
    }

    define('objProto', [], function ()
    {
        var exports;

        exports = Object.prototype;

        return exports;
    });

    define('toString', ['objProto'], function (objProto)
    {
        var exports;

        exports = objProto.toString;

        return exports;
    });

    define('isString', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object String]';
        };

        return exports;
    });

    init([
        'objProto',
        'toString',
        'isString'
    ]);
})();