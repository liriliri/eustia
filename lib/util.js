// Built by eustia.
module.exports = (function ()
{
    var _ = {};

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef;

    _.isUndef = (function ()
    {
        /* Checks if value is undefined.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|Returns true if value is undefined, else false|
         *
         * ```javascript
         * _.isUndef(void 0) // -> true
         * _.isUndef(null) // -> false
         * ```
         *
         * Just a shortcut for **x === undefined**, doesn't matter that much whether you
         * use it or not.
         */

        isUndef = function (val)
        {
            return val === void 0;
        };

        return isUndef;
    })();

    /* ------------------------------ _createAssigner ------------------------------ */

    var _createAssigner;

    _._createAssigner = (function ()
    {
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

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys;

    _.allKeys = (function ()
    {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name  |Type  |Desc                           |
         * |---------------------------------------------|
         * |obj   |object|The object to query            |
         * |return|array |The array of all property names|
         *
         * ```javascript
         * var obj = Object.create({zero: 0});
         * obj.one = 1;
         * allKeys(obj) // -> ['zero', 'one']
         * ```
         *
         * > Members of Object's prototype won't be retrieved.
         */

        allKeys = function (obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        };

        return allKeys;
    })();

    /* ------------------------------ indexOf ------------------------------ */

    var indexOf;

    _.indexOf = (function ()
    {
        // TODO

        indexOf = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        return indexOf;
    })();

    /* ------------------------------ defaults ------------------------------ */

    var defaults;

    _.defaults = (function ()
    {
        // TODO

        defaults = _createAssigner(allKeys, true);

        return defaults;
    })();

    /* ------------------------------ extend ------------------------------ */

    var extend;

    _.extend = (function ()
    {
        // TODO

        extend = _createAssigner(allKeys);

        return extend;
    })();

    /* ------------------------------ has ------------------------------ */

    var has;

    _.has = (function ()
    {
        /* Checks if key is a direct property.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |object|object|The object to query|
         * |key|string|The path to check|
         * |return|boolean|True if key is a direct property, else false|
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key)
        {
            return hasOwnProp.call(obj, key);
        };

        return has;
    })();

    /* ------------------------------ keys ------------------------------ */

    var keys;

    _.keys = (function ()
    {
        /* Creates an array of the own enumerable property names of object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |object|object|The object to query|
         * |return|array|The array of property names|
         */

        keys = Object.keys || function (obj)
        {
            var ret = [], key;

            for (key in obj)
            {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };

        return keys;
    })();

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn;

    _.extendOwn = (function ()
    {
        // TODO

        extendOwn = _createAssigner(keys);

        return extendOwn;
    })();

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr;

    _.objToStr = (function ()
    {
        /* Alias of Object.prototype.toString.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The source value|
         * |return|string|String representation of the given value|
         */

        var ObjToStr = Object.prototype.toString;

        objToStr = function (val)
        {
            return ObjToStr.call(val);
        };

        return objToStr;
    })();

    /* ------------------------------ isArr ------------------------------ */

    var isArr;

    _.isArr = (function ()
    {
        /* Check if value is an array.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is an array, else false|
         */

        isArr = Array.isArray || function (val)
        {
            return objToStr(val) === '[object Array]';
        };

        return isArr;
    })();

    /* ------------------------------ isNum ------------------------------ */

    var isNum;

    _.isNum = (function ()
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is correctly classified, else false|
         */

        isNum = function (val)
        {
            return objToStr(val) === '[object Number]';
        };

        return isNum;
    })();

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike;

    _.isArrLike = (function ()
    {
        // TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return isArrLike;
    })();

    /* ------------------------------ each ------------------------------ */

    var each;

    _.each = (function ()
    {
        // TODO

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

    /* ------------------------------ values ------------------------------ */

    var values;

    _.values = (function ()
    {
        /* function
         * values: Creates an array of the own enumerable property values of object.
         * object(object): The object to query.
         * return(array): The array of property values.
         *
         * ```javascript
         * values({one: 1, two: 2}); // -> [1, 2]
         * ```
         */

        values = function (obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        };

        return values;
    })();

    /* ------------------------------ contain ------------------------------ */

    var contain;

    _.contain = (function ()
    {
        // TODO

        contain = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        return contain;
    })();

    /* ------------------------------ isFn ------------------------------ */

    var isFn;

    _.isFn = (function ()
    {
        /* Check if value is a function.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is a function, else false|
         */

        isFn = function (val)
        {
            return objToStr(val) === '[object Function]';
        };

        return isFn;
    })();

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch;

    _.isMatch = (function ()
    {
        // TODO

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

    /* ------------------------------ isObj ------------------------------ */

    var isObj;

    _.isObj = (function ()
    {
        // TODO

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

    /* ------------------------------ isStr ------------------------------ */

    var isStr;

    _.isStr = (function ()
    {
        /* Checks if value is classified as a String primitive or object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|Returns true if value is correctly classified, else false|
         */

        isStr = function (val)
        {
            return objToStr(val) === '[object String]';
        };

        return isStr;
    })();

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim;

    _.ltrim = (function ()
    {
        // TODO

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

    /* ------------------------------ matcher ------------------------------ */

    var matcher;

    _.matcher = (function ()
    {
        // TODO

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

    /* ------------------------------ noop ------------------------------ */

    var noop;

    _.noop = (function ()
    {
        /* A no-operation function. */

        noop = function () {};

        return noop;
    })();

    /* ------------------------------ now ------------------------------ */

    var now;

    _.now = (function ()
    {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        now = Date.now || function ()
        {
            return new Date().getTime();
        };

        return now;
    })();

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb;

    _.optimizeCb = (function ()
    {
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

        return optimizeCb;
    })();

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb;

    _.safeCb = (function ()
    {
        /* function
         * safeCb: Create callback based on input value.
         */

        safeCb = function (val, ctx, argCount)
        {
            if (val == null) return function (val) { return val };

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

        return safeCb;
    })();

    /* ------------------------------ filter ------------------------------ */

    var filter;

    _.filter = (function ()
    {
        // TODO

        filter = function (obj, predicate, ctx)
        {
            var ret = [];

            predicate = safeCb(predicate, ctx);

            each(obj, function (val, idx, list)
            {
                if (predicate(val, idx, list)) ret.push(val);
            });

            return ret;
        };

        return filter;
    })();

    /* ------------------------------ map ------------------------------ */

    var map;

    _.map = (function ()
    {
        // TODO

        map = function (obj, iteratee, ctx)
        {
            iteratee = safeCb(iteratee, ctx);

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

    /* ------------------------------ readPaths ------------------------------ */

    var readPaths;

    _.readPaths = (function ()
    {
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

    /* ------------------------------ repeat ------------------------------ */

    var repeat;

    _.repeat = (function ()
    {
        /* Repeat string n-times.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |string|string|The string to repeat|
         * |n|number|Repeat times|
         * |return|string|Repeated string|
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

    /* ------------------------------ rpad ------------------------------ */

    var rpad;

    _.rpad = (function ()
    {
        // TODO

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

    /* ------------------------------ log ------------------------------ */

    var log;

    _.log = (function ()
    {
        var handlebars = require('handlebars'),
            chalk = require('chalk');

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
        log.disable = function () { enabled = false };

        return log;
    })();

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim;

    _.rtrim = (function ()
    {
        // TODO

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

    /* ------------------------------ trim ------------------------------ */

    var trim;

    _.trim = (function ()
    {
        // TODO

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return trim;
    })();

    /* ------------------------------ extractBlockCmts ------------------------------ */

    var extractBlockCmts;

    _.extractBlockCmts = (function ()
    {
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

    /* ------------------------------ some ------------------------------ */

    var some;

    _.some = (function ()
    {
        // TODO

        some = function (obj, predicate, ctx)
        {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return some;
    })();

    /* ------------------------------ startWith ------------------------------ */

    var startWith;

    _.startWith = (function ()
    {
        /* Checks if string starts with the given target string.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |string|string|The string to search|
         * |prefix|string|String prefix|
         * |return|boolean|Returns true if string starts with prefix, else false|
         */

        startWith = function (str, prefix)
        {
            return str.indexOf(prefix) === 0;
        };

        return startWith;
    })();

    /* ------------------------------ stripCmts ------------------------------ */

    var stripCmts;

    _.stripCmts = (function ()
    {
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

    /* ------------------------------ stripColorCodes ------------------------------ */

    var stripColorCodes;

    _.stripColorCodes = (function ()
    {
        var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

        stripColorCodes = function (str)
        {
            return str.replace(regColor, '');
        };

        return stripColorCodes;
    })();

    /* ------------------------------ topoSort ------------------------------ */

    var topoSort;

    _.topoSort = (function ()
    {
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

    /* ------------------------------ unique ------------------------------ */

    var unique;

    _.unique = (function ()
    {
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