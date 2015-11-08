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

        var exports = body.apply(_, requires);
        if (exports) _[name] = exports;

        requireMarks[name] = true;

        return _[name];
    }

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

    _define('define', [], function ()
    {
        var define;

        define = function (name, requires, method)
        {
            if (arguments.length === 2)
            {
                method   = requires;
                requires = [];
            }

            _define(name, requires, method);
        };

        _.define = define;
    });

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

    _define('use', ['map'], function (map)
    {
        var use;

        var self = this;

        use = function (requires, method)
        {
            if (method == null)
            {
                requires = [];
                method   = requires;
            }

            requires = map(requires, function (val) { return _require(val) });
            requires.push(self);

            method.apply(self, requires);
        };

        _.use = use;
    });

    _define('State', ['Emitter', 'each', 'isArr', 'some'], function (Emitter, each, isArr, some)
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
                if (some(from, function (val) {return this.current === val}, this))
                {
                    this.current = to;
                    this.emit.apply(name, args);
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
            is: function (state)
            {
                return this.current = state;
            }
        });

        _.State = State;
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

    _define('test', ['Emitter'], function (Emitter)
    {
        var test;

        function print(str) { console.log(str) }

        var Expect = Emitter.extend({
            className: 'Expect',
            initialize: function (name, value)
            {
                this.name  = name;
                this.value = value;

                this.on('error', function (msg) { print('Error: ' + msg) });

                this.on('ok', function (msg) { print('Ok: ' + msg) });
            },
            toBe: function (targetVal)
            {
                this.value === targetVal ? this.emit('ok', this.value + ' is ' + targetVal + '.')
                                         : this.emit('error', this.value + ' should be ' + targetVal + '.');
            },
            toBeTrue: function () { this.toBe(true) },
            toBeFalse: function () { this.toBe(false) }
        });

        test = function (name, callback)
        {
            print('Running test ' + name + ':');

            callback(function (value)
            {
                return new Expect(name, value);
            });
        };

        _.test = test;
    });

    _define('isNum', ['_toStr'], function (_toStr)
    {
        var isNum;

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
    });

    _define('isStr', ['_toStr'], function (_toStr)
    {
        var isStr;

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        _.isStr = isStr;
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

    _define('extend', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var extend;

        extend = _createAssigner(allKeys);

        _.extend = extend;
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

    _define('has', [], function ()
    {
        var has;

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key)
        {
            return obj != null && hasOwnProp.call(obj, key);
        };

        _.has = has;
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

    _define('isArr', ['_toStr'], function (_toStr)
    {
        var isArr;

        var nativeIsArr = Array.isArray;

        isArr = nativeIsArr || function (value)
        {
            return _toStr.call(value) === '[object Array]';
        };

        _.isArr = isArr;
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

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
    });

    _define('isArrLike', ['getLen', 'isNum'], function (getLen, isNum)
    {
        var isArrLike;

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (value)
        {
            var len = getLen(value);

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        _.isArrLike = isArrLike;
    });

    _define('identity', [], function ()
    {
        var identity;

        identity = function (value) { return value };

        _.identity = identity;
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

    _define('cb', ['identity', 'isFn', 'isObj', 'optimizeCb', 'matcher', 'property'], function (identity, isFn, isObj, optimizeCb, matcher, property)
    {
        var cb;

        cb = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return property;
        };

        _.cb = cb;
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

    _define('allKeys', ['isObj'], function (isObj)
    {
        var allKeys;

        allKeys = function (obj)
        {
            if (!isObj(obj)) return [];

            var keys = [];

            for (var key in obj) keys.push(key);

            return keys;
        };

        _.allKeys = allKeys;
    });

    _define('keys', ['isObj', 'has'], function (isObj, has)
    {
        var keys;

        var nativeKeys = Object.keys;

        keys = function (obj)
        {
            if (!isObj(obj)) return [];

            if (nativeKeys) return nativeKeys(obj);

            var keys = [];

            for (var key in obj)
            {
                if (has(obj, key)) keys.push(key);
            }

            return keys;
        };

        _.keys = keys;
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

    _define('getLen', ['property'], function (property)
    {
        var getLen;

        getLen = property('length');

        _.getLen = getLen;
    });

    _define('isFn', ['_toStr'], function (_toStr)
    {
        var isFn;

        isFn = function (value) { return _toStr.call(value) === '[object Function]' };

        _.isFn = isFn;
    });

    _define('isObj', [], function ()
    {
        var isObj;

        isObj = function (value)
        {
            var type = typeof value;

            return type === 'function' || type === 'object';
        };

        _.isObj = isObj;
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

    _define('property', [], function ()
    {
        var property;

        property = function (key)
        {
            return function (obj)
            {
                return obj == null ? undefined : obj[key];
            }
        };

        _.property = property;
    });

    _define('isUndef', [], function ()
    {
        var isUndef;

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
    });

    _define('extendOwn', ['keys', '_createAssigner'], function (keys, _createAssigner)
    {
        var extendOwn;

        extendOwn = _createAssigner(keys);

        _.extendOwn = extendOwn;
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

    _init([
        'Cookie',
        'define',
        'Class',
        'use',
        'State',
        'Emitter',
        'test',
        'isNum',
        'isStr',
        'toArray',
        'extend',
        'inherits',
        'has',
        'map',
        'each',
        'isArr',
        'some',
        'slice',
        '_toStr',
        'isArrLike',
        'identity',
        'values',
        'cb',
        '_createAssigner',
        'allKeys',
        'keys',
        'optimizeCb',
        'getLen',
        'isFn',
        'isObj',
        'matcher',
        'property',
        'isUndef',
        'extendOwn',
        'isMatch'
    ]);
})();