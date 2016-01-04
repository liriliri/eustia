// Built by eustia.
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

    _define('Class', ['extend', 'toArray', 'inherits', 'has'], function (extend, toArray, inherits, has)
    {
        var Class;

        // @TODO

        /* function
         *
         * Class: Create JavaScript class.
         * methods(object): Public methods.
         * statics(object): Static methods.
         * return(function): Return function used to create instances.
         */

        var regCallSuper = /callSuper/;

        function makeClass(parent, methods, statics)
        {
            statics = statics || {};

            var ctor = function ()
            {
                var args = toArray(arguments);

                if (has(ctor.prototype, 'initialize') &&
                    !regCallSuper.test(this.initialize.toString()) &&
                    this.callSuper)
                {
                    args.unshift('initialize');
                    this.callSuper.apply(this, args);
                    args.shift();
                }

                return this.initialize
                       ? this.initialize.apply(this, args) || this
                       : this;
            };

            inherits(ctor, parent);
            ctor.superclass = ctor.prototype.superclass = parent;

            ctor.extend   = function (methods, statics) { return makeClass(ctor, methods, statics) };
            ctor.inherits = function (Class) { inherits(Class, ctor) };
            ctor.methods  = function (methods) { extend(ctor.prototype, methods); return ctor };
            ctor.statics  = function (statics) { extend(ctor, statics); return ctor };

            ctor.methods(methods).statics(statics);

            return ctor;
        }

        Class = function (methods, statics) { return Base.extend(methods, statics) };

        var Base = Class.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function (name)
            {
                var superMethod = this.superclass.prototype[name];

                if (!superMethod) return;

                return superMethod.apply(this, toArray(arguments).slice(1));
            },
            toString: function ()
            {
                return this.className;
            }
        });

        _.Class = Class;
    });

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

        /* function
         *
         * allKeys: Retrieve all the names of object's own and inherited properties.
         * object(object): The object to query.
         * return(array): Returns the array of all property names.
         *
         * ```javascript
         * var obj = Object.create({ a: 0 });
         * obj.b = 1;
         * _.allKeys(obj) // -> ['a', 'b']
         * ```
         *
         * > Members of Object's prototype won't be retrieved.
         *
         */

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

        // @TODO

        contains = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        _.contains = contains;
    });

    _define('defaults', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var defaults;

        // @TODO

        defaults = _createAssigner(allKeys, true);

        _.defaults = defaults;
    });

    _define('each', ['isArrLike', 'keys'], function (isArrLike, keys)
    {
        var each;

        // @TODO

        each = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
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

    _define('extend', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var extend;

        // @TODO

        extend = _createAssigner(allKeys);

        _.extend = extend;
    });

    _define('extendOwn', ['keys', '_createAssigner'], function (keys, _createAssigner)
    {
        var extendOwn;

        // @TODO

        extendOwn = _createAssigner(keys);

        _.extendOwn = extendOwn;
    });

    _define('extractBlockCmts', ['map', 'trim'], function (map, trim)
    {
        var extractBlockCmts;

        var regBlockCmt = /(\/\*[\s\S]*?\*\/)/mg;

        extractBlockCmts = function (str)
        {
            var ret = str.match(regBlockCmt);

            if (!ret) return [];

            ret = map(ret, function (comment)
            {
                return trim(map(comment.split('\n'), function (line)
                {
                    return trim(line).replace(/^\/\*+|\*+\/$|^\*+/g, '');
                }).join('\n'));
            });

            return ret;
        };

        _.extractBlockCmts = extractBlockCmts;
    });

    _define('filter', ['_cb', 'each'], function (_cb, each)
    {
        var filter;

        // @TODO

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

        // @TODO

        /* function
         * has: Checks if key is a direct property.
         * object(object): The object to query.
         * key(string): The path to check.
         * return(boolean): Returns true if key is a direct property, else false.
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key) { return hasOwnProp.call(obj, key) };

        _.has = has;
    });

    _define('identity', [], function ()
    {
        var identity;

        // @TODO

        /* function
         * identity: This method returns the first argument provided to it.
         * value(*): Any value.
         * return(*): Returns value.
         */

        identity = function (value) { return value };

        _.identity = identity;
    });

    _define('indexOf', [], function ()
    {
        var indexOf;

        // @TODO

        indexOf = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        _.indexOf = indexOf;
    });

    _define('inherits', [], function ()
    {
        var inherits;

        // @TODO

        /* function
         * inherits: Inherit the prototype methods from one constructor into another.
         * Class(function): Child Class.
         * SuperClass(function): Super Class.
         */

        var objCreate = Object.create;

        function noop() {}

        inherits = function (Class, SuperClass)
        {
            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

            noop.prototype  = SuperClass.prototype;
            Class.prototype = new noop();
        };

        _.inherits = inherits;
    });

    _define('isArr', ['_toStr'], function (_toStr)
    {
        var isArr;

        // @TODO

        /* function
         * isArr: Check if value is classified as an Array Object
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

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

        // @TODO

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

        // @TODO

        /* function
         * isFn: Checks if value is classified as a Function object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        _.isFn = isFn;
    });

    _define('isMatch', ['keys'], function (keys)
    {
        var isMatch;

        // @TODO

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

        // @TODO

        /* function
         * isNum: Checks if value is classified as a Number primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
    });

    _define('isObj', [], function ()
    {
        var isObj;

        // @TODO

        /* function
         * isObj: Checks if value is the language type of Object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is an object, else false.
         */

        isObj = function (val)
        {
            var type = typeof val;

            return type === 'function' || type === 'object';
        };

        _.isObj = isObj;
    });

    _define('isStr', ['_toStr'], function (_toStr)
    {
        var isStr;

        // @TODO

        /* function
         * isStr: Checks if value is classified as a String primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        _.isStr = isStr;
    });

    _define('isUndef', [], function ()
    {
        var isUndef;

        /* function
         *
         * isUndef: Checks if value is undefined.
         * value(*): The value to check.
         * return(boolean): Returns true if value is undefined, else false.
         *
         * ```javascript
         * _.isUndef(void 0) // -> true
         * _.isUndef(null) // -> false
         * ```
         *
         * Just a shortcut for **x === undefined**, doesn't matter that much whether you
         * use it or not.
         */

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
    });

    _define('keys', ['isObj', 'has'], function (isObj, has)
    {
        var keys;

        // @TODO

        /* function
         * keys: Creates an array of the own enumerable property names of object.
         * object(object): The object to query.
         * return(array): Returns the array of property names.
         */

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
            chalk      = require('chalk');

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

            // All messages is pushed into msgs for debugging purpose when error occurs.
            msgs.push(msg);

            process.stdout.write(msg + '\n');
        };

        log.err = function (msg) { log.color(msg, 'red') };

        log.warn = function (msg) { log.color(msg, 'yellow') };

        log.ok = function (msg) { log.color(msg, 'green') };

        log.color = function (msg, color)
        {
            log({ msg: msg }, '{{#' + color + '}}{{msg}}{{/' + color + '}}');
        };

        log.get = function () { return msgs };

        log.enable = function () { enabled = true };

        _.log = log;
    });

    _define('ltrim', [], function ()
    {
        var ltrim;

        // @TODO

        var regSpace = /^\s+/;

        ltrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var start   = 0,
                len     = str.length,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && start < len)
            {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return (start >= len) ? '' : str.substr(start, len);
        };

        _.ltrim = ltrim;
    });

    _define('map', ['_cb', 'keys', 'isArrLike'], function (_cb, keys, isArrLike)
    {
        var map;

        // @TODO

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

        // @TODO

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

    _define('noop', [], function ()
    {
        var noop;

        // @TODO

        /* function
         * noop: A no-operation function that returns undefined regardless of the arguments it receives.
         */

        noop = function () {};

        _.noop = noop;
    });

    _define('now', [], function ()
    {
        var now;

        // @TODO

        /* function
         * now: Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        now = Date.now || function () { return new Date().getTime() };

        _.now = now;
    });

    _define('repeat', [], function ()
    {
        var repeat;

        // @TODO

        /* function
         * repeat: Repeat string n-times.
         * string(string): The string to repeat.
         * n(number): Repeat times.
         * return(string): Repeated string.
         */

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

        // @TODO

        /* function
         *
         * rpad: Pads string on the right side if it's shorter than length.
         * string(string): The string to pad.
         * length(number): Padding length.
         * chars(string): String used as padding.
         * return(string): Resulted string.
         */

        rpad = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? str + repeat(chars, len - strLen): str;
        };

        _.rpad = rpad;
    });

    _define('rtrim', [], function ()
    {
        var rtrim;

        // @TODO

        var regSpace = /\s+$/;

        rtrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var end     = str.length - 1,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && end >= 0)
            {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return (end >= 0) ? str.substring(0, end + 1) : '';
        };

        _.rtrim = rtrim;
    });

    _define('slice', [], function ()
    {
        var slice;

        // @TODO

        var arrProto = Array.prototype;

        slice = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        _.slice = slice;
    });

    _define('startWith', [], function ()
    {
        var startWith;

        // @TODO

        /* function
         * startWith: Checks if string starts with the given target string.
         * string(string): The string to search.
         * prefix(string): String prefix.
         * return(boolean): Returns true if string starts with prefix, else false.
         */

        startWith = function (str, prefix) { return str.indexOf(prefix) === 0 };

        _.startWith = startWith;
    });

    _define('stripCmts', [], function ()
    {
        var stripCmts;

        stripCmts = function (str)
        {
            str = ('__' + str + '__').split('');
            var mode = {
                singleQuote: false,
                doubleQuote: false,
                regex: false,
                blockComment: false,
                lineComment: false,
                condComp: false
            };
            for (var i = 0, l = str.length; i < l; i++)
            {
                if (mode.regex)
                {
                    if (str[i] === '/' && str[i-1] !== '\\') mode.regex = false;
                    continue;
                }
                if (mode.singleQuote)
                {
                    if (str[i] === "'" && str[i-1] !== '\\') mode.singleQuote = false;
                    continue;
                }

                if (mode.doubleQuote)
                {
                    if (str[i] === '"' && str[i-1] !== '\\') mode.doubleQuote = false;
                    continue;
                }

                if (mode.blockComment)
                {
                    if (str[i] === '*' && str[i+1] === '/')
                    {
                        str[i+1] = '';
                        mode.blockComment = false;
                    }
                    str[i] = '';
                    continue;
                }

                if (mode.lineComment)
                {
                    if (str[i+1] === '\n') mode.lineComment = false;
                    str[i] = '';
                    continue;
                }

                mode.doubleQuote = str[i] === '"';
                mode.singleQuote = str[i] === "'";

                if (str[i] === '/')
                {
                    if (str[i+1] === '*')
                    {
                        str[i] = '';
                        mode.blockComment = true;
                        continue;
                    }
                    if (str[i+1] === '/')
                    {
                        str[i] = '';
                        mode.lineComment = true;
                        continue;
                    }
                    mode.regex = true;
                }
            }

            return str.join('').slice(2, -2);
        };

        _.stripCmts = stripCmts;
    });

    _define('toArray', ['isArr', 'slice', 'isStr', 'isArrLike', 'map', 'identity', 'values'], function (isArr, slice, isStr, isArrLike, map, identity, values)
    {
        var toArray;

        // @TODO

        var regReStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

        toArray = function (obj)
        {
            if (!obj) return [];

            if (isArr(obj)) return slice(obj);

            if (isStr(obj)) return obj ? obj.match(regReStrSymbol) : [];

            if (isArrLike(obj)) return map(obj, identity);

            return values(obj);
        };

        _.toArray = toArray;
    });

    _define('trim', ['ltrim', 'rtrim'], function (ltrim, rtrim)
    {
        var trim;

        // @TODO

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        _.trim = trim;
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

        // @TODO

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
        'Class',
        '_cb',
        '_createAssigner',
        '_optimizeCb',
        '_toStr',
        'allKeys',
        'contains',
        'defaults',
        'each',
        'extend',
        'extendOwn',
        'extractBlockCmts',
        'filter',
        'has',
        'identity',
        'indexOf',
        'inherits',
        'isArr',
        'isArrLike',
        'isFn',
        'isMatch',
        'isNum',
        'isObj',
        'isStr',
        'isUndef',
        'keys',
        'log',
        'ltrim',
        'map',
        'matcher',
        'noop',
        'now',
        'repeat',
        'rpad',
        'rtrim',
        'slice',
        'startWith',
        'stripCmts',
        'toArray',
        'trim',
        'unique',
        'values'
    ]);

    return _;
})();