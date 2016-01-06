// Built by eustia.
module.exports = (function ()
{
    var _ = {};

    var inherits = _.inherits = (function ()
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

        return inherits;
    })();

    var has = _.has = (function ()
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

        return has;
    })();

    var identity = _.identity = (function ()
    {
        var identity;

        // @TODO

        /* function
         * identity: This method returns the first argument provided to it.
         * value(*): Any value.
         * return(*): Returns value.
         */

        identity = function (value) { return value };

        return identity;
    })();

    var isObj = _.isObj = (function ()
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

        return isObj;
    })();

    var isUndef = _.isUndef = (function ()
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

        return isUndef;
    })();

    var _createAssigner = _._createAssigner = (function ()
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

        return _createAssigner;
    })();

    var _optimizeCb = _._optimizeCb = (function ()
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

        return _optimizeCb;
    })();

    var _toStr = _._toStr = (function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        return _toStr;
    })();

    var isFn = _.isFn = (function ()
    {
        var isFn;

        // @TODO

        /* function
         * isFn: Checks if value is classified as a Function object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        return isFn;
    })();

    var allKeys = _.allKeys = (function ()
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

        return allKeys;
    })();

    var extend = _.extend = (function ()
    {
        var extend;

        // @TODO

        extend = _createAssigner(allKeys);

        return extend;
    })();

    var indexOf = _.indexOf = (function ()
    {
        var indexOf;

        // @TODO

        indexOf = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        return indexOf;
    })();

    var defaults = _.defaults = (function ()
    {
        var defaults;

        // @TODO

        defaults = _createAssigner(allKeys, true);

        return defaults;
    })();

    var keys = _.keys = (function ()
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

        return keys;
    })();

    var values = _.values = (function ()
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

        return values;
    })();

    var extendOwn = _.extendOwn = (function ()
    {
        var extendOwn;

        // @TODO

        extendOwn = _createAssigner(keys);

        return extendOwn;
    })();

    var isArr = _.isArr = (function ()
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

        return isArr;
    })();

    var isNum = _.isNum = (function ()
    {
        var isNum;

        // @TODO

        /* function
         * isNum: Checks if value is classified as a Number primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        return isNum;
    })();

    var isArrLike = _.isArrLike = (function ()
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

        return isArrLike;
    })();

    var contains = _.contains = (function ()
    {
        var contains;

        // @TODO

        contains = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        return contains;
    })();

    var each = _.each = (function ()
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

        return each;
    })();

    var isMatch = _.isMatch = (function ()
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

        return isMatch;
    })();

    var matcher = _.matcher = (function ()
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

        return matcher;
    })();

    var _cb = _._cb = (function ()
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

        return _cb;
    })();

    var filter = _.filter = (function ()
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

        return filter;
    })();

    var map = _.map = (function ()
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

        return map;
    })();

    var isStr = _.isStr = (function ()
    {
        var isStr;

        // @TODO

        /* function
         * isStr: Checks if value is classified as a String primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        return isStr;
    })();

    var ltrim = _.ltrim = (function ()
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

        return ltrim;
    })();

    var noop = _.noop = (function ()
    {
        var noop;

        // @TODO

        /* function
         * noop: A no-operation function that returns undefined regardless of the arguments it receives.
         */

        noop = function () {};

        return noop;
    })();

    var now = _.now = (function ()
    {
        var now;

        // @TODO

        /* function
         * now: Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        now = Date.now || function () { return new Date().getTime() };

        return now;
    })();

    var readPaths = _.readPaths = (function ()
    {
        var readPaths;

        var async = require('async'),
            fs    = require('fs'),
            glob  = require('glob');

        function expandPaths(paths, options, cb)
        {
            var files = [];

            var walker = async.queue(function (path, cb)
            {
                glob(path, {
                    ignore: options.ignore
                }, function (err, result)
                {
                    if (err) return cb(err);

                    files = files.concat(result);

                    cb();
                });
            }, 50);

            each(paths, function (val) { walker.push(val) });

            walker.drain = function () { cb(null, files) };
        }

        readPaths = function (paths, options, cb)
        {
            expandPaths(paths, options, function (err, files)
            {
                if (err) return cb(err);

                async.map(files, function (file, cb)
                {
                    fs.readFile(file, options.encoding, function (err, data)
                    {
                        if (err) return cb(err);

                        cb(null, { path: file, data: data });
                    });
                }, function (err, results)
                {
                    if (err) return cb(err);

                    cb(null, results);
                });
            });
        };

        return readPaths;
    })();

    var repeat = _.repeat = (function ()
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

        return repeat;
    })();

    var rpad = _.rpad = (function ()
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

        return rpad;
    })();

    var log = _.log = (function ()
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

        return log;
    })();

    var rtrim = _.rtrim = (function ()
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

        return rtrim;
    })();

    var trim = _.trim = (function ()
    {
        var trim;

        // @TODO

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return trim;
    })();

    var extractBlockCmts = _.extractBlockCmts = (function ()
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

        return extractBlockCmts;
    })();

    var slice = _.slice = (function ()
    {
        var slice;

        // @TODO

        var arrProto = Array.prototype;

        slice = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        return slice;
    })();

    var toArray = _.toArray = (function ()
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

        return toArray;
    })();

    var Class = _.Class = (function ()
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

        return Class;
    })();

    var startWith = _.startWith = (function ()
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

        return startWith;
    })();

    var stripCmts = _.stripCmts = (function ()
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

        return stripCmts;
    })();

    var topoSort = _.topoSort = (function ()
    {
        var topoSort;

        function uniqueNodes(arr)
        {
            var ret = [];

            for (var i = 0, len = arr.length; i < len; i++)
            {
                var edge = arr[i];
                if (ret.indexOf(edge[0]) < 0) ret.push(edge[0]);
                if (ret.indexOf(edge[1]) < 0) ret.push(edge[1]);
            }

            return ret;
        }

        function sort(nodes, edges)
        {
            var cursor = nodes.length,
                sorted = new Array(cursor),
                visited = {},
                i = cursor;

            while (i--)
            {
                if (!visited[i]) visit(nodes[i], i, []);
            }

            function visit(node, i, predecessors)
            {
                if(predecessors.indexOf(node) >= 0)
                {
                    throw new Error('Cyclic dependency: ' + JSON.stringify(node));
                }

                if (visited[i]) return;
                visited[i] = true;

                var outgoing = edges.filter(function(edge) { return edge[0] === node });

                if (i = outgoing.length)
                {
                    var preds = predecessors.concat(node);
                    do {
                        var child = outgoing[--i][1];
                        visit(child, nodes.indexOf(child), preds);
                    } while (i)
                }

                sorted[--cursor] = node
            }

            return sorted;
        }

        topoSort = function(edges) { return sort(uniqueNodes(edges), edges) };

        return topoSort;
    })();

    var unique = _.unique = (function ()
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

        return unique;
    })();

    return _;
})();