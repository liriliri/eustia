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

        return _[name];
    }

    define('isNumber', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object Number]';
        };

        return exports;
    });

    define('test', [], function ()
    {
        var exports;

        var assert = {
            ok: function (result, msg)
            {
                msg = (result ? 'Ok' : 'Failed, expected argument to be true') + ': ' + msg;

                console.log(msg);
            }
        };

        exports = function (name, callback)
        {
            console.log(name + ':');
            callback(assert);
        };

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

    define('extend', ['createAssigner', 'allKeys'], function (createAssigner, allKeys)
    {
        var exports;

        exports = createAssigner(allKeys);

        return exports;
    });

    define('clone', ['isObject', 'isArray', 'extend'], function (isObject, isArray, extend)
    {
        var exports;

        exports = function (obj)
        {
            if (!isObject(obj)) return obj;

            return isArray(obj) ? obj.slice() : extend({}, obj);
        };

        return exports;
    });

    define('createAssigner', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (keysFunc, defaults)
        {
            return function (obj)
            {
                var len = arguments.length;

                if (defaults) obj = Object(obj);

                if (len < 2 || obj === null) return obj;

                for (var i = 1; i < len; i++)
                {
                    var src     = arguments[i],
                        keys    = keysFunc(src),
                        keysLen = keys.length;

                    for (var j = 0; j < keysLen; j++)
                    {
                        var key = keys[j];
                        if (!defaults || obj[key] === undefined) obj[key] = src[key];
                    }
                }

                return obj;
            };
        };

        return exports;
    });

    define('toString', ['objProto'], function (objProto)
    {
        var exports;

        exports = objProto.toString;

        return exports;
    });

    define('allKeys', ['isObject'], function (isObject)
    {
        var exports;

        exports = function (obj)
        {
            if (!isObject(obj)) return [];

            var keys = [];

            for (var key in obj) keys.push(key);

            return keys;
        };

        return exports;
    });

    define('isObject', [], function ()
    {
        var exports;

        exports = function (obj)
        {
            var type = typeof obj;

            return type === 'function' || type === 'object' && !!obj;
        };

        return exports;
    });

    define('undefined', [], function ()
    {
        var exports;

        var undefined;

        exports = undefined;

        return exports;
    });

    define('objProto', [], function ()
    {
        var exports;

        exports = Object.prototype;

        return exports;
    });

    define('isArray', [], function ()
    {
        var exports;

        exports = Array.isArray;

        return exports;
    });

    init([
        'isNumber',
        'test',
        'isString',
        'extend',
        'clone',
        'createAssigner',
        'toString',
        'allKeys',
        'isObject',
        'undefined',
        'objProto',
        'isArray'
    ]);
})();