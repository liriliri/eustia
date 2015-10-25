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

    _define('Class', ['extend', 'toArray', 'inherits', 'has'], function (extend, toArray, inherits, has)
    {
        var exports;

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

        var Base = makeClass(Object, {
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

        exports = function (methods, statics) { return Base.extend(methods, statics) };

        return exports;
    });

    _define('Cookies', ['extend', 'isNumber', 'undefined'], function (extend, isNumber, undefined)
    {
        var exports;

        var defOpts = { path: '/' };

        var Cookies = function (key, val, options)
        {
            if (arguments.length > 1)
            {
                options = extend(defOpts, options);

                if (isNumber(options.expires))
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

                return;
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

        exports = {
            get: Cookies,
            set: Cookies,
            remove: function (key, options)
            {
                options = options || {};
                options.expires = -1;
                Cookies(key, '', options);
            }
        };

        return exports;
    });

    _define('define', [], function ()
    {
        var exports;

        exports = function (name, requires, method)
        {
            if (arguments.length === 2)
            {
                method   = requires;
                requires = [];
            }

            _define(name, requires, method);
        };

        return exports;
    });

    _define('use', ['map'], function (map)
    {
        var exports;

        var self = this;

        exports = function (requires, method)
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

        return exports;
    });

    _define('State', ['Emitter', 'each', 'isArray'], function (Emitter, each, isArray)
    {
        var exports;

        var State = Emitter.extend({
            initialize: function (initial, events)
            {
                this.current = initial;

                var self = this;

                each(events, function (event, key)
                {
                    self[key] = self.buildEvent(key, event);
                });
            },
            is: function (state)
            {
                return this.current = state;
            },
            buildEvent: function (name, event)
            {
                var from = event.from,
                    to   = event.to;

                if (!isArray(from)) from = [from];

                return function ()
                {
                    var flag = from.some(function (val)
                    {
                        return this.current === val;
                    }, this);

                    if (flag)
                    {
                        this.current = to;
                        this.emit(name);
                    }
                };
            }
        });

        exports = State;

        return exports;
    });

    _define('Emitter', ['Class', 'has', 'each', 'slice'], function (Class, has, each, slice)
    {
        var exports;

        var Emitter = Class({
            initialize: function ()
            {
                this._events = this._events || {};
            },
            on: function (event, listener)
            {
                this._events[event] = this._events[event] || [];
                this._events[event].push(listener);
            },
            off: function (event, listener)
            {
                if (!has(this._events, event)) return;

                this._events[event].splice(this._events[event].indexOf(listener), 1);
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
            },
            emit: function (event)
            {
                if (!has(this._events, event)) return;

                var args = slice(arguments, 1);

                each(this._events[event], function (val)
                {
                    val.apply(this, args);
                }, this);
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

        exports = Emitter;

        return exports;
    });

    _define('test', [], function ()
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

    _define('isNumber', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object Number]';
        };

        return exports;
    });

    _define('isString', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object String]';
        };

        return exports;
    });

    _define('extend', ['createAssigner', 'allKeys'], function (createAssigner, allKeys)
    {
        var exports;

        exports = createAssigner(allKeys);

        return exports;
    });

    _define('clone', ['isObject', 'isArray', 'extend'], function (isObject, isArray, extend)
    {
        var exports;

        exports = function (obj)
        {
            if (!isObject(obj)) return obj;

            return isArray(obj) ? obj.slice() : extend({}, obj);
        };

        return exports;
    });

    _define('deepExtend', ['isPlainObject', 'each', 'deepClone'], function (isPlainObject, each, deepClone)
    {
        var exports;

        exports = function (obj)
        {
            var i   = 0,
                ret = obj,
                len = arguments.length;

            while (++i < len)
            {
                obj = arguments[i];

                if (isPlainObject(ret) && isPlainObject(obj))
                {
                    each(obj, function (val, key)
                    {
                        ret[key] = exports(ret[key], obj[key]);
                    });
                } else
                {
                    ret = deepClone(obj);
                }
            }

            return ret;
        };

        return exports;
    });

    _define('deepClone', ['keys', 'isObject', 'isFunction', 'isArray', 'each'], function (keys, isObject, isFunction, isArray, each)
    {
        var exports;

        function mapObject(obj, iteratee)
        {
            var newObj = {};

            each(obj, function (val, key)
            {
                var pair = iteratee(key, val);

                newObj[pair[0]] = pair[1];
            });

            return newObj;
        }

        exports = function (obj)
        {
            if (isArray(obj))
            {
                return obj.map(function (val)
                {
                    return exports(val);
                });
            }

            if (isObject(obj) && !isFunction(obj))
            {
                return mapObject(obj, function (key, val)
                {
                    return [key, exports(val)];
                });
            }

            return obj;
        };

        return exports;
    });

    _define('map', ['cb', 'keys', 'isArrLike'], function (cb, keys, isArrLike)
    {
        var exports;

        exports = function (obj, iteratee, ctx)
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

        return exports;
    });

    _define('trim', ['strProto'], function (strProto)
    {
        var exports;

        var regEscape = /([.*+?^=!:${}()|[\]\/\\])/g;

        function escapeRegExp(str)
        {
            return str.replace(regEscape, '\\$1');
        }

        var nativeTrim      = strProto.trim,
            nativeTrimLeft  = strProto.trimLeft,
            nativeTrimRight = strProto.trimRight;

        exports = function (str, chars, direction)
        {
            direction = direction || '';
            chars     = chars || '\\s';

            chars = '[' + escapeRegExp(chars) + ']';

            var native   = nativeTrim,
                regLeft  = '^' + chars + '+',
                regRight = chars + '+$',
                regStr   = regLeft + '|' + regRight;

            switch (direction)
            {
                case 'l': native = nativeTrimLeft; regStr = regLeft; break;
                case 'r': native = nativeTrimRight; regStr = regRight; break;
            }

            if (chars === '\\s' && nativeTrim) return native.call(str);

            return direction === '' ? str.replace(new RegExp(regStr, 'g'), '')
                                    : str.replace(new RegExp(regStr), '');
        };

        return exports;
    });

    _define('ltrim', ['trim'], function (trim)
    {
        var exports;

        exports = function (str, chars)
        {
            return trim(str, chars, 'l');
        };

        return exports;
    });

    _define('rtrim', ['trim'], function (trim)
    {
        var exports;

        exports = function (str, chars)
        {
            return trim(str, chars, 'r');
        };

        return exports;
    });

    _define('toArray', ['isArray', 'slice', 'isString', 'isArrLike', 'map', 'identity', 'values'], function (isArray, slice, isString, isArrLike, map, identity, values)
    {
        var exports;

        var regReStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

        exports = function (obj)
        {
            if (!obj) return [];

            if (isArray(obj)) return slice(obj);

            if (isString(obj)) return obj ? obj.match(regReStrSymbol) : [];

            if (isArrLike(obj)) return map(obj, identity);

            return values(obj);
        };

        return exports;
    });

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

    _define('undefined', [], function ()
    {
        var exports;

        var undefined;

        exports = undefined;

        return exports;
    });

    _define('inherits', [], function ()
    {
        var exports;

        var objCreate = Object.create;

        function noop() {}

        exports = function (Class, SuperClass)
        {
            if (objCreate)
            {
                Class.prototype = objCreate(SuperClass.prototype);
                return;
            }

            noop.prototype = SuperClass.prototype;
            Class.prototype = new noop();
        };

        return exports;
    });

    _define('slice', ['arrProto'], function (arrProto)
    {
        var exports;

        exports = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        return exports;
    });

    _define('toString', ['objProto'], function (objProto)
    {
        var exports;

        exports = objProto.toString;

        return exports;
    });

    _define('isArray', [], function ()
    {
        var exports;

        exports = Array.isArray;

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

    _define('isPlainObject', ['isObject', 'isArray'], function (isObject, isArray)
    {
        var exports;

        exports = function (obj)
        {
            return isObject(obj) && !isArray(obj);
        };

        return exports;
    });

    _define('isFunction', ['toString'], function (toString)
    {
        var exports;

        exports = function (val)
        {
            return toString.call(val) === '[object Function]';
        };

        return exports;
    });

    _define('cb', ['identity', 'isFunction', 'isObject', 'optimizeCb', 'matcher', 'property'], function (identity, isFunction, isObject, optimizeCb, matcher, property)
    {
        var exports;

        exports = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFunction(val)) return optimizeCb(val, ctx, argCount);

            if (isObject(val)) return matcher(val);

            return property;
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

    _define('strProto', [], function ()
    {
        var exports;

        exports = String.prototype;

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

    _define('identity', [], function ()
    {
        var exports;

        exports = function (val)
        {
            return val;
        };

        return exports;
    });

    _define('values', ['keys'], function (keys)
    {
        var exports;

        exports = function (obj)
        {
            var _keys = keys(obj),
                len   = _keys.length,
                ret   = Array(len);

            for (var i = 0; i < len; i++) ret[i] = obj[_keys[i]];

            return ret;
        };

        return exports;
    });

    _define('objProto', [], function ()
    {
        var exports;

        exports = Object.prototype;

        return exports;
    });

    _define('arrProto', [], function ()
    {
        var exports;

        exports = Array.prototype;

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

    _define('matcher', ['extendOwn', 'isMatch'], function (extendOwn, isMatch)
    {
        var exports;

        exports = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

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

    _define('getLen', ['property'], function (property)
    {
        var exports;

        exports = property('length');

        return exports;
    });

    _define('extendOwn', ['keys', 'createAssigner'], function (keys, createAssigner)
    {
        var exports;

        exports = createAssigner(keys);

        return exports;
    });

    _define('isMatch', ['keys'], function (keys)
    {
        var exports;

        exports = function (obj, attrs)
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

        return exports;
    });

    _init([
        'Class',
        'Cookies',
        'define',
        'use',
        'State',
        'Emitter',
        'test',
        'isNumber',
        'isString',
        'extend',
        'clone',
        'deepExtend',
        'deepClone',
        'map',
        'trim',
        'ltrim',
        'rtrim',
        'toArray',
        'has',
        'undefined',
        'inherits',
        'slice',
        'toString',
        'isArray',
        'createAssigner',
        'allKeys',
        'isObject',
        'keys',
        'isPlainObject',
        'isFunction',
        'cb',
        'isArrLike',
        'strProto',
        'each',
        'identity',
        'values',
        'objProto',
        'arrProto',
        'optimizeCb',
        'matcher',
        'property',
        'getLen',
        'extendOwn',
        'isMatch'
    ]);
})();