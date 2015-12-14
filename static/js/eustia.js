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

    _define('use', ['map'], function (map)
    {
        var use;

        var self = this;

        use = function (requires, method)
        {
            if (method == null)
            {
                method   = requires;
                requires = [];
            }

            requires = map(requires, function (val) { return _require(val) });
            requires.push(self);

            method.apply(self, requires);
        };

        _.use = use;
    });

    _define('Select', ['Class', 'isStr', 'each', 'isObj', 'some', 'camelize', 'isNum', 'dasherize'], function (Class, isStr, each, isObj, some, camelize, isNum, dasherize)
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

        var cssNumber = {
            'column-count': 1,
            'columns'     : 1,
            'font-weight' : 1,
            'line-weight' : 1,
            'opacity'     : 1,
            'z-index'     : 1,
            'zoom'        : 1
        };

        function addPx(name, val)
        {
            if (isNum(val) && !cssNumber[dasherize(name)]) return val + 'px';

            return val;
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
                if (val == null && isStr(name))
                {
                    return this[0].style[camelize(name)];
                }

                var css = '';

                if (isStr(name))
                {
                    css = dasherize(name) + ':' + addPx(name, val) + ';';
                } else
                {
                    each(name, function (val, key)
                    {
                        css += dasherize(key) + ':' + addPx(key, val) + ';';
                    });
                }

                return this.each(function ()
                {
                    this.style.cssText += ';' + css;
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

            hasClass: function (name)
            {
                return some(this, function (el)
                {
                    return this.test(el.className);
                }, new RegExp('(^|\\s)' + name + '(\\s|$)'));
            },

            addClass: function (name)
            {
                var newName = name.split(/\s+/g);

                return this.each(function ()
                {
                    var classList = [],
                        $this = new Select(this);
                    each(newName, function (val)
                    {
                        if (!$this.hasClass(val)) classList.push(val);
                    });
                    if (classList.length !== 0) this.className += ' ' + classList.join(' ');
                });
            },
            rmClass: function (name)
            {
                return this.each(function () { this.classList.remove(name) });
            },
            append: function (val)
            {
                return this.each(function ()
                {
                    this.insertAdjacentHTML('beforeend', val);
                });
            },

            after: function ()
            {

            },
            before: function (val)
            {
                return this.each(function ()
                {
                    this.insertAdjacentHTML('beforebegin', val);
                });
            },
            prepend: function (val)
            {
                return this.each(function ()
                {
                    this.insertAdjacentHTML('afterbegin', val);
                });
            }
        });

        var rootSelect = new Select(document);

        _.Select = Select;
    });

    _define('each', ['isArrLike', 'keys', '_optimizeCb'], function (isArrLike, keys, _optimizeCb)
    {
        var each;

        each = function (obj, iteratee, ctx)
        {
            iteratee = _optimizeCb(iteratee, ctx);

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

    _define('isStr', ['_toStr'], function (_toStr)
    {
        var isStr;

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        _.isStr = isStr;
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

    _define('camelize', [], function ()
    {
        var camelize;

        camelize = function (str)
        {
            return str.replace(/-+(.)?/g, function (match, char)
            {
                return char ? char.toUpperCase() : '';
            });
        };

        _.camelize = camelize;
    });

    _define('some', ['_cb', 'isArrLike', 'keys'], function (_cb, isArrLike, keys)
    {
        var some;

        some = function (obj, predicate, ctx)
        {
            predicate = _cb(predicate, ctx);

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

    _define('isNum', ['_toStr'], function (_toStr)
    {
        var isNum;

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
    });

    _define('dasherize', [], function ()
    {
        var dasherize;

        dasherize = function (str)
        {
            return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
        };

        _.dasherize = dasherize;
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

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
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

    _define('extend', ['_createAssigner', 'allKeys'], function (_createAssigner, allKeys)
    {
        var extend;

        extend = _createAssigner(allKeys);

        _.extend = extend;
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

    _define('identity', [], function ()
    {
        var identity;

        identity = function (value) { return value };

        _.identity = identity;
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

    _define('isUndef', [], function ()
    {
        var isUndef;

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
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
        'use',
        'Select',
        'each',
        'isStr',
        'map',
        'isObj',
        'camelize',
        'some',
        'isNum',
        'dasherize',
        'Class',
        'isArrLike',
        'keys',
        '_toStr',
        '_cb',
        'extend',
        'toArray',
        '_optimizeCb',
        'has',
        'inherits',
        'identity',
        'isFn',
        'matcher',
        'allKeys',
        'slice',
        'isArr',
        'values',
        'isUndef',
        '_createAssigner',
        'extendOwn',
        'isMatch'
    ]);

    return _;
}));