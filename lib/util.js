(function ()
{
    var _ = {};

    typeof module !== 'undefined' && module.exports ? module.exports = _
                                                    : window._ = _;

    function _define(name, requires, method)
    {
        _[name] = {
            requires: requires,
            body    : method
        };

        delete requireMarks[name];
    }

    function _init(methods)
    {
        for (var i = 0, len = methods.length; i < len; i++) _require(methods[i]);
    }

    var requireMarks = {};

    function _require(name)
    {
        if (requireMarks.hasOwnProperty(name)) return _[name];

        var requires = _[name].requires,
            body     = _[name].body,
            len      = requires.length;

        for (var i = 0; i < len; i++) requires[i] = _require(requires[i]);

        requires.push(_);

        _[name] = body.apply(_, requires);

        requireMarks[name] = true;

        return _[name];
    }

    _define('has', ['objProto'], function (objProto)
    {
        var exports;

        var hasOwnProperty = objProto.hasOwnProperty;

        exports = function (obj, key)
        {
            return obj != null && hasOwnProperty.call(obj, key);
        };

        return exports;
    });

    _define('each', ['isArrLike', 'keys', 'optimizeCb'], function (isArrLike, keys, optimizeCb)
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
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee(obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    });

    _define('isUndefined', [], function ()
    {
        var exports;

        exports = function (val)
        {
            return val === void 0;
        };

        return exports;
    });

    _define('stripComments', [], function ()
    {
        var exports;

        var regStripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        exports = function (str)
        {
            return str.replace(regStripComments, '');
        };

        return exports;
    });

    _define('log', ['rpad', 'each'], function (rpad, each)
    {
        var exports;

        var handlebars = require('handlebars'),
            fs         = require('fs'),
            chalk      = require('chalk');

        handlebars.registerHelper('rapd', function (len, ctx)
        {
            return rpad(ctx.fn(this), parseInt(len, 10));
        });

        each(['yellow', 'green', 'cyan', 'red', 'white', 'magenta'], function (color)
        {
            handlebars.registerHelper(color, function (ctx)
            {
                return chalk[color](ctx.fn(this));
            });
        });

        exports = function (msg)
        {
            process.stdout.write(msg + '\n');
        };

        exports.err = function (msg)
        {
            process.stdout.write(msg + '\n');
            process.exit();
        };

        var tpl = {};

        exports.tpl = function (msg, tplPath)
        {
            if (tpl[tplPath])
            {
                exports(tpl[tplPath](msg));
            } else
            {
                fs.readFile(tplPath, 'utf-8', function (err, data)
                {
                    if (err) return;

                    tpl[tplPath] = handlebars.compile(data, {noEscape: true});

                    exports(tpl[tplPath](msg));
                });
            }
        };

        return exports;
    });

    _define('extend', ['createAssigner', 'allKeys'], function (createAssigner, allKeys)
    {
        var exports;

        exports = createAssigner(allKeys);

        return exports;
    });

    _define('readPaths', ['expandPaths'], function (expandPaths)
    {
        var exports;

        var fs    = require('fs'),
            async = require('async');

        exports = function (paths, options, callback)
        {
            expandPaths(paths, options, function (err, files)
            {
                if (err) return callback(err);

                async.map(files, function (file, callback)
                {
                    fs.readFile(file, options.encoding, function (err, data)
                    {
                        if (err) return callback(err);

                        callback(null, data);
                    });
                }, function (err, results)
                {
                    if (err) return callback(err);

                    callback(null, results);
                });
            });
        };

        return exports;
    });

    _define('objProto', [], function ()
    {
        var exports;

        exports = Object.prototype;

        return exports;
    });

    _define('optimizeCb', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (func, ctx, argCount)
        {
            if (ctx === undefined) return func;

            switch (argCount == null ? 3 : argCount)
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

    _define('keys', ['isObject', 'has'], function (isObject, has)
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

    _define('createAssigner', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (keysFunc, defaults)
        {
            return function (obj)
            {
                var len = arguments.length;

                if (defaults) obj = Object(obj);

                if (len < 2 || obj == null) return obj;

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

    _define('allKeys', ['isObject'], function (isObject)
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

    _define('rpad', ['pad'], function (pad)
    {
        var exports;

        exports = function (str, len, padStr)
        {
            return pad(str, len, padStr, 'r');
        };

        return exports;
    });

    _define('isArrLike', ['getLen', 'isNumber'], function (getLen, isNumber)
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

    _define('undefined', [], function ()
    {
        var exports;

        var undefined;

        exports = undefined;

        return exports;
    });

    _define('isObject', [], function ()
    {
        var exports;

        exports = function (obj)
        {
            var type = typeof obj;

            return type === 'function' || type === 'object' && !!obj;
        };

        return exports;
    });

    _define('pad', [], function ()
    {
        var exports;

        function strRepeat(str, qty)
        {
            var ret = '';

            if (qty < 1) return ret;

            while (qty > 0)
            {
                if (qty & 1) ret += str;
                qty >>= 1;
                str += str;
            }

            return ret;
        }

        exports = function (str, len, padStr, type)
        {
            var padLen = 0;

            padStr = padStr || ' ';
            padStr = padStr.charAt(0);

            padLen = len - str.length;

            switch (type)
            {
                case 'r': return str + strRepeat(padStr, padLen);
                case 'l': return strRepeat(padStr, padLen) + str;
                default: return strRepeat(padStr, Math.ceil(padLen / 2)) +
                                str +
                                strRepeat(padStr, Math.floor(padLen /2));
            }
        };

        return exports;
    });

    _define('isNumber', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object Number]';
        };

        return exports;
    });

    _define('getLen', ['property'], function (property)
    {
        var exports;

        exports = property('length');

        return exports;
    });

    _define('toString', ['objProto'], function (objProto)
    {
        var exports;

        exports = objProto.toString;

        return exports;
    });

    _define('property', ['undefined'], function (undefined)
    {
        var exports;

        exports = function (key)
        {
            return function (obj)
            {
                return obj == null ? undefined : obj[key];
            }
        };

        return exports;
    });

    _define('expandPaths', ['each'], function (each)
    {
        var exports;

        var async = require('async'),
            fs    = require('fs'),
            path  = require('path');

        var resolve = path.resolve;

        exports = function (paths, options, callback)
        {
            var files = [];

            var walker = async.queue(function (path, callback)
            {
                fs.stat(path, function (err, stat)
                {
                    if (err) return callback(err);

                    if (stat.isDirectory())
                    {
                        fs.readdir(path, function (err, files)
                        {
                            if (err) return callback(err);

                            each(files, function (val)
                            {
                                walker.push(resolve(path, val));
                            });
                            callback();
                        });
                        return;
                    }

                    if (options.exclude && options.exclude.test(path)) return callback();

                    files.push(path);
                    callback();
                });
            }, 50);

            _.each(paths, function (val) { walker.push(val) });

            walker.drain = function () { callback(null, files) };
        };

        return exports;
    });

    _init([
        'has',
        'each',
        'isUndefined',
        'stripComments',
        'log',
        'extend',
        'readPaths',
        'objProto',
        'optimizeCb',
        'keys',
        'createAssigner',
        'allKeys',
        'rpad',
        'isArrLike',
        'undefined',
        'isObject',
        'pad',
        'isNumber',
        'getLen',
        'toString',
        'property',
        'expandPaths'
    ]);
})();