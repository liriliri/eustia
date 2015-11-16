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

    _define('Select', ['Class', 'isStr', 'each', 'isObj'], function (Class, isStr, each, isObj)
    {
        var Select;

        function mergeArr(first, second)
        {
            var len = second.length,
                i   = first.length;

            for (var j = 0; j < len; j++) first[i++] = second[j];

            first.length = i;

            return first;
        }

        function setAttr(node, name, val)
        {
            val == null ? node.removeAttribute(name) : node.setAttribute(name, val);
        }

        Select = Class({
            className: 'Select',
            initialize: function (selector)
            {
                this.length = 0;

                if (!selector) return this;

                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType)
                {
                    this[0]     = selector;
                    this.length = 1;
                }
            },
            find: function (selector)
            {
                var ret = new Select;

                this.each(function ()
                {
                    mergeArr(ret, this.querySelectorAll(selector));
                });

                return ret;
            },
            each: function (fn)
            {
                each(this, function (element, idx)
                {
                    fn.call(element, idx, element);
                });

                return this;
            },
            css: function (name, val)
            {
                if (val === undefined) return this[0].style[name];

                return this.each(function ()
                {
                    this.style[name] = val;
                });
            },
            hide: function ()
            {
                return this.css('display', 'none');
            },
            attr: function (name, val)
            {
                if (val == null && isStr(name))
                {
                    return this[0].getAttribute(name);
                }

                return this.each(function ()
                {
                    var self = this;

                    if (isObj(name))
                    {
                        each(name, function (val, key) { setAttr(self, key, val) });
                    } else
                    {
                        setAttr(this, name, val);
                    }
                });
            },
            data: function (name, val)
            {
                var newName = name;

                if (isStr(name)) newName = 'data-' + name;
                if (isObj(name))
                {
                    newName = {};
                    each(name, function (val, key) { newName['data-' + key] = val });
                }

                return this.attr(newName, val);
            },
            html: function (val)
            {
                if (val == null) return this[0].innerHTML;

                return this.each(function () { this.innerHTML = val });
            },
            text: function (val)
            {
                if (val == null) return this[0].textContent;

                return this.each(function () { this.textContent = val });
            },
            val: function (val)
            {
                if (val == null) return this[0].value;

                return this.each(function () { this.value = val });
            },
            on: function (type, fn)
            {
                return this.each(function ()
                {
                    this.addEventListener(type, fn, false);
                });
            },
            off: function (type, fn)
            {
                return this.each(function ()
                {
                    this.removeEventListener(type, fn);
                });
            },
            first: function () { return new Select(this[0]) },
            last : function () { return new Select(this[this.length - 1]) },
            addClass: function (name)
            {
                return this.each(function () { this.classList.add(name) });
            },
            rmClass: function (name)
            {
                return this.each(function () { this.classList.remove(name) });
            }
        });

        var rootSelect = new Select(document);

        _.Select = Select;
    });

    _define('extend', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var extend;

        extend = _createAssigner(allKeys);

        _.extend = extend;
    });

    _define('isNum', ['_toStr'], function (_toStr)
    {
        var isNum;

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
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

    _define('isStr', ['_toStr'], function (_toStr)
    {
        var isStr;

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        _.isStr = isStr;
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

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
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

    _define('isUndef', [], function ()
    {
        var isUndef;

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
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

    _define('isFn', ['_toStr'], function (_toStr)
    {
        var isFn;

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        _.isFn = isFn;
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
        'Select',
        'extend',
        'isNum',
        'Class',
        'isStr',
        'each',
        'isObj',
        '_createAssigner',
        'allKeys',
        '_toStr',
        'toArray',
        'has',
        'inherits',
        'isArrLike',
        'keys',
        'optimizeCb',
        'isUndef',
        'isArr',
        'slice',
        'map',
        'identity',
        'values',
        'cb',
        'isFn',
        'matcher',
        'extendOwn',
        'isMatch'
    ]);

    return _;
}));