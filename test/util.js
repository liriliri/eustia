(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory() }
}(this, function ()
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

    _define('allKeys', [], function ()
    {
        var allKeys;

        allKeys = function (obj)
        {
            var keys = [];

            for (var key in obj) keys.push(key);

            return keys;
        };

        _.allKeys = allKeys;
    });

    _define('Emitter', ['Class', 'has', 'each', 'slice'], function (Class, has, each, slice)
    {
        var Emitter;

        Emitter = Class({
            initialize: function ()
            {
                this._events = this._events || {};
            },
            on: function (event, listener)
            {
                this._events[event] = this._events[event] || [];
                this._events[event].push(listener);

                return this;
            },
            off: function (event, listener)
            {
                if (!has(this._events, event)) return;

                this._events[event].splice(this._events[event].indexOf(listener), 1);

                return this;
            },
            once: function (event, listener)
            {
                var fired = false;

                function g()
                {
                    this.off(event, g);
                    if (!fired)
                    {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }

                this.on(event, g);

                return this;
            },
            emit: function (event)
            {
                if (!has(this._events, event)) return;

                var args = slice(arguments, 1);

                each(this._events[event], function (val)
                {
                    val.apply(this, args);
                }, this);

                return this;
            }
        }, {
            mixin: function (obj)
            {
                each(['on', 'off', 'once', 'emit'], function (val)
                {
                    obj[val] = Emitter.prototype[val];
                });

                obj._events = obj._events || {};
            }
        });

        _.Emitter = Emitter;
    });

    _define('Cookie', ['extend', 'isNum'], function (extend, isNum)
    {
        var Cookie;

        var defOpts = { path: '/' };

        var cookie = function (key, val, options)
        {
            if (arguments.length > 1)
            {
                options = extend(defOpts, options);

                if (isNum(options.expires))
                {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
                    options.expires = expires;
                }

                val = encodeURIComponent(String(val));
                key = encodeURIComponent(key);

                document.cookie = [
                    key, '=', val,
                    options.expires && '; expires=' + options.expires.toUTCString(),
                    options.path    && '; path=' + options.path,
                    options.domain  && '; domain=' + options.domain,
                    options.secure ? '; secure' : ''
                ].join('');

                return Cookie;
            }

            var cookies = document.cookie ? document.cookie.split('; ') : [],
                result  = key ? undefined : {};

            for (var i = 0, len = cookies.length; i < len; i++)
            {
                var cookie = cookies[i],
                    parts  = cookie.split('='),
                    name   = decodeURIComponent(parts.shift());

                cookie = parts.join('=');
                cookie = decodeURIComponent(cookie);

                if (key === name)
                {
                    result = cookie;
                    break;
                }

                if (!key) result[name] = cookie;
            }

            return result;
        };

        Cookie = {

            get: cookie,

            set: cookie,
            remove: function (key, options)
            {
                options = options || {};
                options.expires = -1;
                return cookie(key, '', options);
            }
        };

        _.Cookie = Cookie;
    });

    _define('has', [], function ()
    {
        var has;

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key) { return hasOwnProp.call(obj, key) };

        _.has = has;
    });

    _define('inherits', [], function ()
    {
        var inherits;

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

    _define('invert', ['keys', 'each'], function (keys, each)
    {
        var invert;

        invert = function (obj)
        {
            var ret = {};

            each(obj, function (val, key) { ret[val] = key });

            return ret;
        };

        _.invert = invert;
    });

    _define('isBool', [], function ()
    {
        var isBool;

        isBool = function (val) { return val === true || val === false };

        _.isBool = isBool;
    });

    _define('isFn', ['_toStr'], function (_toStr)
    {
        var isFn;

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        _.isFn = isFn;
    });

    _define('isInt', ['isNum'], function (isNum)
    {
        var isInt;

        isInt = function (val) { return isNum(val) && (val % 1 === 0) };

        _.isInt = isInt;
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

    _define('lpad', ['repeat'], function (repeat)
    {
        var lpad;

        lpad = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? repeat(chars, len - strLen) + str : str;
        };

        _.lpad = lpad;
    });

    _define('last', [], function ()
    {
        var last;

        last = function (arr)
        {
            var len = arr ? arr.length : 0;

            return len ? arr[len - 1] : undefined;
        };

        _.last = last;
    });

    _define('ltrim', [], function ()
    {
        var ltrim;

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

    _define('pad', ['repeat'], function (repeat)
    {
        var pad;

        pad = function (str, len, chars)
        {
            var padLen = len - str.length;

            return repeat(chars, Math.ceil(padLen / 2)) + str +
                   repeat(chars, Math.floor(padLen /2));
        };

        _.pad = pad;
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

    _define('random', [], function ()
    {
        var random;

        random = function (min, max)
        {
            if (max == null)
            {
                max = min;
                min = 0;
            }

            return min + Math.floor(Math.random() * (max - min + 1));
        };

        _.random = random;
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

    _define('rtrim', [], function ()
    {
        var rtrim;

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

    _define('State', ['Emitter', 'each', 'isArr', 'some', 'slice'], function (Emitter, each, isArr, some, slice)
    {
        var State;

        function buildEvent(name, event)
        {
            var from = event.from,
                to   = event.to;

            if (!isArr(from)) from = [from];

            return function ()
            {
                var args = slice(arguments, 1);
                args.unshift(name);
                if (some(from, function (val) {return this.current === val}, this))
                {
                    this.current = to;
                    this.emit.apply(this, args);
                }
            };
        }

        State = Emitter.extend({
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
            is: function (state) { return this.current === state }
        });

        _.State = State;
    });

    _define('startWith', [], function ()
    {
        var startWith;

        startWith = function (str, prefix) { return str.indexOf(prefix) === 0 };

        _.startWith = startWith;
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

    _define('trim', ['ltrim', 'rtrim'], function (ltrim, rtrim)
    {
        var trim;

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        _.trim = trim;
    });

    _define('extendOwn', ['keys', '_createAssigner'], function (keys, _createAssigner)
    {
        var extendOwn;

        extendOwn = _createAssigner(keys);

        _.extendOwn = extendOwn;
    });

    _define('identity', [], function ()
    {
        var identity;

        identity = function (value) { return value };

        _.identity = identity;
    });

    _define('map', ['cb', 'keys', 'isArrLike'], function (cb, keys, isArrLike)
    {
        var map;

        map = function (obj, iteratee, ctx)
        {
            iteratee = cb(iteratee, ctx);

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

    _define('toArray', ['isArr', 'slice', 'isStr', 'isArrLike', 'map', 'identity', 'values'], function (isArr, slice, isStr, isArrLike, map, identity, values)
    {
        var toArray;

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

    _define('optimizeCb', ['isUndef'], function (isUndef)
    {
        var optimizeCb;

        optimizeCb = function (func, ctx, argCount)
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

        _.optimizeCb = optimizeCb;
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

    _define('endWith', [], function ()
    {
        var endWith;

        endWith = function (str, suffix)
        {
            var idx = str.length - suffix.length;

            return idx >= 0 && str.indexOf(suffix, idx) === idx;
        };

        _.endWith = endWith;
    });

    _define('slice', [], function ()
    {
        var slice;

        var arrProto = Array.prototype;

        slice = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        _.slice = slice;
    });

    _define('some', ['cb', 'isArrLike', 'keys'], function (cb, isArrLike, keys)
    {
        var some;

        some = function (obj, predicate, ctx)
        {
            predicate = cb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        _.some = some;
    });

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
    });

    _define('extend', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var extend;

        extend = _createAssigner(allKeys);

        _.extend = extend;
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

    _define('cb', ['identity', 'isFn', 'isObj', 'optimizeCb', 'matcher'], function (identity, isFn, isObj, optimizeCb, matcher)
    {
        var cb;

        cb = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        _.cb = cb;
    });

    _define('each', ['isArrLike', 'keys', 'optimizeCb'], function (isArrLike, keys, optimizeCb)
    {
        var each;

        each = function (obj, iteratee, ctx)
        {
            iteratee = optimizeCb(iteratee, ctx);

            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee(obj[i], i, obj);
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

        _.each = each;
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

    _define('isStr', ['_toStr'], function (_toStr)
    {
        var isStr;

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        _.isStr = isStr;
    });

    _init([
        'Class',
        'allKeys',
        'Emitter',
        'Cookie',
        'has',
        'inherits',
        'invert',
        'isBool',
        'isFn',
        'isInt',
        'isNum',
        'isObj',
        'isUndef',
        'keys',
        'lpad',
        'last',
        'ltrim',
        'pad',
        'repeat',
        'random',
        'rpad',
        'rtrim',
        'State',
        'startWith',
        'isArr',
        'trim',
        'extendOwn',
        'identity',
        'map',
        'isMatch',
        'toArray',
        'optimizeCb',
        'isArrLike',
        'endWith',
        'slice',
        'some',
        '_toStr',
        'extend',
        '_createAssigner',
        'matcher',
        'cb',
        'each',
        'values',
        'isStr'
    ]);

    return _;
}));