// Built by eustia.
module.exports = (function ()
{
    var _ = {};

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function (exports)
    {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name  |Type  |Desc                           |
         * |---------------------------------------------|
         * |obj   |object|The object to query            |
         * |return|array |The array of all property names|
         *
         * > Members of Object's prototype won't be retrieved.
         *
         * ```javascript
         * var obj = Object.create({zero: 0});
         * obj.one = 1;
         * allKeys(obj) // -> ['zero', 'one']
         * ```
         */

        exports = function (obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ indexOf ------------------------------ */

    var indexOf = _.indexOf = (function (exports)
    {
        // TODO

        exports = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        return exports;
    })({});

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function (exports)
    {
        /* Check if value is undefined.
         *
         * |Name  |Type   |Desc                      |
         * |-----------------------------------------|
         * |val   |*      |The value to check        |
         * |return|boolean|True if value is undefined|
         *
         * ```javascript
         * isUndef(void 0); // -> true
         * isUndef(null); // -> false
         * ```
         */

        exports = function (val)
        {
            return val === void 0;
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports)
    {
        /* Checks if key is a direct property.
         *
         * |Name  |Type   |Desc                            |
         * |-----------------------------------------------|
         * |obj   |object |The object to query             |
         * |key   |string |The path to check               |
         * |return|boolean|True if key is a direct property|
         *
         * ```javascript
         * has({one: 1}, 'one'); // -> true
         * ```
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function (obj, key)
        {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports)
    {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Type  |Desc                       |
         * |-----------------------------------------|
         * |obj   |object|The object to query        |
         * |return|array |The array of property names|
         */

        exports = Object.keys || function (obj)
        {
            var ret = [], key;

            for (key in obj)
            {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports)
    {
        /* Alias of Object.prototype.toString.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The source value|
         * |return|string|String representation of the given value|
         */

        var ObjToStr = Object.prototype.toString;

        exports = function (val)
        {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports)
    {
        /* Check if value is an `Array` object.
         *
         * |Name  |Type   |Desc                              |
         * |-------------------------------------------------|
         * |val   |*      |The value to check                |
         * |return|boolean|True if value is an `Array` object|
         *
         * ```javascript
         * isArr([]); // -> true
         * isArr({}); // -> false
         * ```
         */

        exports = Array.isArray || function (val)
        {
            return objToStr(val) === '[object Array]';
        };

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports)
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is correctly classified, else false|
         */

        exports = function (val)
        {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports)
    {
        // TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports)
    {
        // TODO

        exports = function (obj, iteratee, ctx)
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

        return exports;
    })({});

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function (exports)
    {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Type    |Desc                          |
         * |------------------------------------------------|
         * |keysFn  |function|Function to get object keys   |
         * |defaults|boolean |No override when set to true  |
         * |return  |function|The result function, extend...|
         */

        exports = function (keysFn, defaults)
        {
            return function (obj)
            {
                each(arguments, function (src, idx)
                {
                    if (idx === 0) return;

                    var keys = keysFn(src);

                    each(keys, function (key)
                    {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });

                return obj;
            };
        };

        return exports;
    })({});

    /* ------------------------------ defaults ------------------------------ */

    var defaults = _.defaults = (function (exports)
    {
        // TODO

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports)
    {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name  |Type  |Desc                  |
         * |------------------------------------|
         * |obj   |object|The destination object|
         * |*src  |object|The sources objects   |
         * |return|object|The destination object|
         *
         * ```javascript
         * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports)
    {
        // TODO

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function (exports)
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

        exports = function (obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function (exports)
    {
        // TODO

        exports = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        return exports;
    })({});

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function (exports)
    {
        /* Check if value is a function.
         *
         * |Name  |Type   |Desc                       |
         * |------------------------------------------|
         * |val   |*      |The value to check         |
         * |return|boolean|True if value is a function|
         *
         * Generator function is also classified as true.
         *
         * ```javascript
         * isFn(function() {}); // -> true
         * isFn(function*() {}); // -> true
         * ```
         */

        exports = function (val)
        {
            var objStr = objToStr(val);

            return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
        };

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function (exports)
    {
        // TODO

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
    })({});

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function (exports)
    {
        /* Check if value is the language type of Object.
         *
         * |Name  |Type   |Desc                      |
         * |-----------------------------------------|
         * |val   |*      |The value to check        |
         * |return|boolean|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         *
         * ```javascript
         * isObj({}); // -> true
         * isObj([]); // -> true
         * ```
         */

        exports = function (val)
        {
            var type = typeof val;

            return !!val && (type === 'function' || type === 'object');
        };

        return exports;
    })({});

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function (exports)
    {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |--------------------------------------------------|
         * |val   |*      |The value to check                 |
         * |return|boolean|True if value is a string primitive|
         *
         * ```javascript
         * isStr('eris'); // -> true
         * ```
         */

        exports = function (val)
        {
            return objToStr(val) === '[object String]';
        };

        return exports;
    })({});

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function (exports)
    {
        // TODO

        var regSpace = /^\s+/;

        exports = function (str, chars)
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

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function (exports)
    {
        // TODO

        exports = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

        return exports;
    })({});

    /* ------------------------------ noop ------------------------------ */

    var noop = _.noop = (function (exports)
    {
        /* A no-operation function. */

        exports = function () {};

        return exports;
    })({});

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports)
    {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch. */

        exports = Date.now || function ()
        {
            return new Date().getTime();
        };

        return exports;
    })({});

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function (exports)
    {
        exports = function (func, ctx, argCount)
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

        return exports;
    })({});

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports)
    {
        /* function
         * safeCb: Create callback based on input value.
         */

        exports = function (val, ctx, argCount)
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

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function (exports)
    {
        // TODO

        exports = function (obj, predicate, ctx)
        {
            var ret = [];

            predicate = safeCb(predicate, ctx);

            each(obj, function (val, idx, list)
            {
                if (predicate(val, idx, list)) ret.push(val);
            });

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function (exports)
    {
        // TODO

        exports = function (obj, iteratee, ctx)
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

        return exports;
    })({});

    /* ------------------------------ readPaths ------------------------------ */

    var readPaths = _.readPaths = (function (exports)
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

        exports = function (paths, options, cb)
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

        return exports;
    })({});

    /* ------------------------------ repeat ------------------------------ */

    var repeat = _.repeat = (function (exports)
    {
        /* Repeat string n-times.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |string|string|The string to repeat|
         * |n|number|Repeat times|
         * |return|string|Repeated string|
         */

        exports = function (str, n)
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

        return exports;
    })({});

    /* ------------------------------ rpad ------------------------------ */

    var rpad = _.rpad = (function (exports)
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

        exports = function (str, len, chars)
        {
            var strLen = str.length;

            return strLen < len ? str + repeat(chars, len - strLen): str;
        };

        return exports;
    })({});

    /* ------------------------------ log ------------------------------ */

    var log = _.log = (function (exports)
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

        var log = function (msg, tpl)
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

        exports = log;

        return exports;
    })({});

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function (exports)
    {
        // TODO

        var regSpace = /\s+$/;

        exports = function (str, chars)
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

        return exports;
    })({});

    /* ------------------------------ trim ------------------------------ */

    var trim = _.trim = (function (exports)
    {
        // TODO

        var regSpace = /^\s+|\s+$/g;

        exports = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return exports;
    })({});

    /* ------------------------------ extractBlockCmts ------------------------------ */

    var extractBlockCmts = _.extractBlockCmts = (function (exports)
    {
        /* Extract block comments from source code.
         */

        var regBlockCmt = /(\/\*[\s\S]*?\*\/)/mg;

        exports = function (str)
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

        return exports;
    })({});

    /* ------------------------------ some ------------------------------ */

    var some = _.some = (function (exports)
    {
        // TODO

        exports = function (obj, predicate, ctx)
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

        return exports;
    })({});

    /* ------------------------------ startWith ------------------------------ */

    var startWith = _.startWith = (function (exports)
    {
        /* Checks if string starts with the given target string.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |string|string|The string to search|
         * |prefix|string|String prefix|
         * |return|boolean|Returns true if string starts with prefix, else false|
         */

        exports = function (str, prefix)
        {
            return str.indexOf(prefix) === 0;
        };

        return exports;
    })({});

    /* ------------------------------ stripCmts ------------------------------ */

    var stripCmts = _.stripCmts = (function (exports)
    {
        /* Strip comments from source code.
         */

        exports = function (str)
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

        return exports;
    })({});

    /* ------------------------------ stripColorCodes ------------------------------ */

    var stripColorCodes = _.stripColorCodes = (function (exports)
    {
        var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

        exports = function (str)
        {
            return str.replace(regColor, '');
        };

        return exports;
    })({});

    /* ------------------------------ topoSort ------------------------------ */

    var topoSort = _.topoSort = (function (exports)
    {
        /* Topological sorting algorithm.
         */

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

        exports = function(edges) { return sort(uniqueNodes(edges), edges) };

        return exports;
    })({});

    /* ------------------------------ unique ------------------------------ */

    var unique = _.unique = (function (exports)
    {
        function isEqual(a, b) { return a === b }

        exports = function (arr, compare)
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

        return exports;
    })({});

    return _;
})();