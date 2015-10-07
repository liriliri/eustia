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

    define('each', ['isArrLike', 'keys', 'optimizeCb'], function (isArrLike, keys, optimizeCb)
    {
        var exports;

        exports = function (obj, iteratee, ctx)
        {
            iteratee = optimizeCb(iteratee, ctx);

            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++)
                {
                    iteratee(obj[i], i, obj);
                }
            } else
            {
                keys = keys(obj);
                for (i = 0, len = keys.length; i < len; i++)
                {
                    iteratee(obj[keys[i]], keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    });

    define('isUndefined', [], function ()
    {
        var exports;

        exports = function (val)
        {
            return val === void 0;
        };

        return exports;
    });

    define('isArrLike', ['getLen', 'isNumber'], function (getLen, isNumber)
    {
        var exports;

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function (collection)
        {
            var len = getLen(collection);

            return isNumber(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return exports;
    });

    define('optimizeCb', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (func, ctx, argCount)
        {
            if (ctx === undefined) return func;

            switch (argCount === null ? 3 : argCount)
            {
                case 1: return function (val)
                {
                    return func.call(ctx, val);
                };
                case 3: return function (val, idx, collection)
                {
                    return func.call(ctx, val, idx, collection);
                };
                case 4: return function (accumulator, val, idx, collection)
                {
                    return func.call(ctx, accumulator, val, idx, collection);
                }
            }

            return function ()
            {
                return func.apply(ctx, arguments);
            };
        };

        return exports;
    });

    define('keys', ['isObject', 'has'], function (isObject, has)
    {
        var exports;

        var nativeKeys = Object.keys;

        exports = function (obj)
        {
            if (!isObject(obj)) return [];

            if (nativeKeys) return nativeKeys(obj);

            var keys = [];

            for (var key in obj)
            {
                if (has(obj, key)) keys.push(key);
            }

            return keys;
        };

        return exports;
    });

    define('getLen', ['property'], function (property)
    {
        var exports;

        exports = property('length');

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

    define('isNumber', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object Number]';
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

    define('has', ['objProto'], function (objProto)
    {
        var exports;

        var hasOwnProperty = objProto.hasOwnProperty;

        exports = function (obj, key)
        {
            return obj !== null && hasOwnProperty.call(obj, key);
        };

        return exports;
    });

    define('property', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (key)
        {
            return function (obj)
            {
                return obj === null ? undefined : obj[key];
            }
        };

        return exports;
    });

    define('toString', ['objProto'], function (objProto)
    {
        var exports;

        exports = objProto.toString;

        return exports;
    });

    define('objProto', [], function ()
    {
        var exports;

        exports = Object.prototype;

        return exports;
    });

    init([
        'each',
        'isUndefined',
        'isArrLike',
        'optimizeCb',
        'keys',
        'getLen',
        'isObject',
        'isNumber',
        'undefined',
        'has',
        'property',
        'toString',
        'objProto'
    ]);
})();