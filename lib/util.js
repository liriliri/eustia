// Built by eustia. 2015-12-27 23:24:59
module.exports = (function ()
{
    var _ = {};

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

        var exports = body.apply(_, requires);
        if (exports) _[name] = exports;

        requireMarks[name] = true;

        return _[name];
    }

    _define('_cb', ['identity', 'isFn', 'isObj', '_optimizeCb', 'matcher'], function (identity, isFn, isObj, _optimizeCb, matcher)
    {
        var _cb;

        _cb = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return _optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        _._cb = _cb;
    });

    _define('_createAssigner', ['isUndef'], function (isUndef)
    {
        var _createAssigner;

        _createAssigner = function (keysFunc, defaults)
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
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    }
                }

                return obj;
            };
        };

        _._createAssigner = _createAssigner;
    });

    _define('_optimizeCb', ['isUndef'], function (isUndef)
    {
        var _optimizeCb;

        _optimizeCb = function (func, ctx, argCount)
        {
            if (isUndef(ctx)) return func;

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

        _._optimizeCb = _optimizeCb;
    });

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
    });

    _define('allKeys', [], function ()
    {
        var allKeys;

        allKeys = function (obj)
        {
            var keys = [], key;

            for (key in obj) keys.push(key);

            return keys;
        };

        _.allKeys = allKeys;
    });

    _define('contains', ['indexOf', 'isArrLike', 'values'], function (indexOf, isArrLike, values)
    {
        var contains;

        contains = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        _.contains = contains;
    });

    _define('datetime', [], function ()
    {
        var datetime;

        datetime = function ()
        {
            var date = new Date();

            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
                   ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        };

        _.datetime = datetime;
    });

    _define('defaults', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var defaults;

        defaults = _createAssigner(allKeys, true);

        _.defaults = defaults;
    });

    _define('each', ['isArrLike', 'keys'], function (isArrLike, keys)
    {
        var each;

        each = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee(obj[i], i, obj);
            } else
            {
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        _.each = each;
    });

    _define('expandPaths', ['each'], function (each)
    {
        var expandPaths;

        var async = require('async'),
            glob  = require('glob');

        expandPaths = function (paths, options, callback)
        {
            var files = [];

            var walker = async.queue(function (path, callback)
            {
                glob(path, {
                    ignore: ['util.js']
                }, function (err, result)
                {
                    if (err) return callback(err);

                    files = files.concat(result);

                    callback();
                });
            }, 50);

            _.each(paths, function (val) { walker.push(val) });

            walker.drain = function () { callback(null, files)};
        };

        _.expandPaths = expandPaths;
    });

    _define('extendOwn', ['keys', '_createAssigner'], function (keys, _createAssigner)
    {
        var extendOwn;

        extendOwn = _createAssigner(keys);

        _.extendOwn = extendOwn;
    });

    _define('filter', ['_cb', 'each'], function (_cb, each)
    {
        var filter;

        filter = function (obj, predicate, ctx)
        {
            var ret = [];

            predicate = _cb(predicate, ctx);

            each(obj, function (val, idx, list)
            {
                if (predicate(val, idx, list)) ret.push(val);
            });

            return ret;
        };

        _.filter = filter;
    });

    _define('has', [], function ()
    {
        var has;

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key) { return hasOwnProp.call(obj, key) };

        _.has = has;
    });

    _define('identity', [], function ()
    {
        var identity;

        identity = function (value) { return value };

        _.identity = identity;
    });

    _define('indexOf', [], function ()
    {
        var indexOf;

        indexOf = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        _.indexOf = indexOf;
    });

    _define('isArr', ['_toStr'], function (_toStr)
    {
        var isArr;

        var nativeIsArr = Array.isArray;

        isArr = nativeIsArr || function (val)
        {
            return _toStr.call(val) === '[object Array]';
        };

        _.isArr = isArr;
    });

    _define('isArrLike', ['isNum', 'has'], function (isNum, has)
    {
        var isArrLike;

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        _.isArrLike = isArrLike;
    });

    _define('isFn', ['_toStr'], function (_toStr)
    {
        var isFn;

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        _.isFn = isFn;
    });

    _define('isMatch', ['keys'], function (keys)
    {
        var isMatch;

        isMatch = function (obj, attrs)
        {
            var _keys = keys(attrs),
                len   = _keys.length;

            if (obj == null) return !len;

            obj = Object(obj);

            for (var i = 0; i < len; i++)
            {
                var key = keys[i];
                if (attrs[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        _.isMatch = isMatch;
    });

    _define('isNum', ['_toStr'], function (_toStr)
    {
        var isNum;

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
    });

    _define('isObj', [], function ()
    {
        var isObj;

        isObj = function (val)
        {
            var type = typeof val;

            return type === 'function' || type === 'object';
        };

        _.isObj = isObj;
    });

    _define('isUndef', [], function ()
    {
        var isUndef;

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
    });

    _define('keys', ['isObj', 'has'], function (isObj, has)
    {
        var keys;

        var nativeKeys = Object.keys;

        keys = nativeKeys || function (obj)
        {
            var keys = [];

            for (var key in obj) { if (has(obj, key)) keys.push(key) }

            return keys;
        };

        _.keys = keys;
    });

    _define('log', ['rpad', 'each'], function (rpad, each)
    {
        var log;

        var handlebars = require('handlebars'),
            chalk      = require('chalk'),
            path = require('path'),
            fs   = require('fs');

        handlebars.registerHelper('rapd', function (len, ctx)
        {
            return rpad(ctx.fn(this), parseInt(len, 10), ' ');
        });

        each(['yellow', 'green', 'cyan', 'red', 'white', 'magenta'], function (color)
        {
            handlebars.registerHelper(color, function (ctx)
            {
                return chalk[color](ctx.fn(this));
            });
        });

        var msgs = [], enabled = false;

        log = function (msg, tpl)
        {
            if (!enabled) return;

            if (tpl) msg = handlebars.compile(tpl, { noEscape: true })(msg);

            msgs.push(msg);

            process.stdout.write(msg + '\n');
        };

        log.err = function (msg)
        {
            log.color(msg, 'red');

            var logPath = path.resolve(process.cwd(), './eustia-debug.log');

            fs.writeFileSync(logPath, msgs.join('\n'), 'utf-8');

            process.exit();
        };

        log.warn = function (msg) { log.color(msg, 'yellow') };

        log.ok = function (msg) { log.color(msg, 'green') };

        log.color = function (msg, color)
        {
            log({
                msg: msg
            }, '{{#' + color + '}}{{msg}}{{/' + color + '}}');
        };

        log.enable = function () { enabled = true };

        _.log = log;
    });

    _define('map', ['_cb', 'keys', 'isArrLike'], function (_cb, keys, isArrLike)
    {
        var map;

        map = function (obj, iteratee, ctx)
        {
            iteratee = _cb(iteratee, ctx);

            var _keys   = !isArrLike(obj) && keys(obj),
                len     = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++)
            {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iteratee(obj[curKey], curKey, obj);
            }

            return results;
        };

        _.map = map;
    });

    _define('matcher', ['extendOwn', 'isMatch'], function (extendOwn, isMatch)
    {
        var matcher;

        matcher = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

        _.matcher = matcher;
    });

    _define('now', [], function ()
    {
        var now;

        now = Date.now || function () { return new Date().getTime() };

        _.now = now;
    });

    _define('readPaths', ['expandPaths'], function (expandPaths)
    {
        var readPaths;

        var fs    = require('fs'),
            async = require('async');

        readPaths = function (paths, options, callback)
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

        _.readPaths = readPaths;
    });

    _define('repeat', [], function ()
    {
        var repeat;

        repeat = function (str, n)
        {
            var ret = '';

            if (n < 1) return '';

            while (n > 0)
            {
                if (n & 1) ret += str;
                n >>= 1;
                str += str;
            }

            return ret;
        };

        _.repeat = repeat;
    });

    _define('rpad', ['repeat'], function (repeat)
    {
        var rpad;

        rpad = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? str + repeat(chars, len - strLen): str;
        };

        _.rpad = rpad;
    });

    _define('startWith', [], function ()
    {
        var startWith;

        startWith = function (str, prefix) { return str.indexOf(prefix) === 0 };

        _.startWith = startWith;
    });

    _define('stripComments', [], function ()
    {
        var stripComments;

        var regStripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

        stripComments = function (str)
        {
            return str.replace(regStripComments, '');
        };

        _.stripComments = stripComments;
    });

    _define('unique', ['filter'], function (filter)
    {
        var unique;

        function isEqual(a, b) { return a === b }

        unique = function (arr, compare)
        {
            compare = compare || isEqual;

            return filter(arr, function (item, idx, arr)
            {
                var len = arr.length;

                while (++idx < len)
                {
                    if (compare(item, arr[idx])) return false;
                }

                return true;
            });
        };

        _.unique = unique;
    });

    _define('values', ['keys'], function (keys)
    {
        var values;

        values = function (obj)
        {
            var _keys = keys(obj),
                len   = _keys.length,
                ret   = Array(len);

            for (var i = 0; i < len; i++) ret[i] = obj[_keys[i]];

            return ret;
        };

        _.values = values;
    });

    _init([
        '_cb',
        '_createAssigner',
        '_optimizeCb',
        '_toStr',
        'allKeys',
        'contains',
        'datetime',
        'defaults',
        'each',
        'expandPaths',
        'extendOwn',
        'filter',
        'has',
        'identity',
        'indexOf',
        'isArr',
        'isArrLike',
        'isFn',
        'isMatch',
        'isNum',
        'isObj',
        'isUndef',
        'keys',
        'log',
        'map',
        'matcher',
        'now',
        'readPaths',
        'repeat',
        'rpad',
        'startWith',
        'stripComments',
        'unique',
        'values'
    ]);

    return _;
})();