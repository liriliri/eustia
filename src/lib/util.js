// Built by eustia.
/* eslint-disable */
"use strict";

var _ = {};

/* ------------------------------ allKeys ------------------------------ */

var allKeys = _.allKeys = (function (exports) {
    exports = function exports(obj) {
        var ret = [],
            key;

        for (key in obj) {
            ret.push(key);
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ idxOf ------------------------------ */

var idxOf = _.idxOf = (function (exports) {
    exports = function exports(arr, val, fromIdx) {
        return Array.prototype.indexOf.call(arr, val, fromIdx);
    };

    return exports;
})({});

/* ------------------------------ isUndef ------------------------------ */

var isUndef = _.isUndef = (function (exports) {
    exports = function exports(val) {
        return val === void 0;
    };

    return exports;
})({});

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = _.optimizeCb = (function (exports) {
    exports = function exports(fn, ctx, argCount) {
        if (isUndef(ctx)) return fn;

        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function(val) {
                    return fn.call(ctx, val);
                };

            case 3:
                return function(val, idx, collection) {
                    return fn.call(ctx, val, idx, collection);
                };

            case 4:
                return function(accumulator, val, idx, collection) {
                    return fn.call(ctx, accumulator, val, idx, collection);
                };
        }

        return function() {
            return fn.apply(ctx, arguments);
        };
    };

    return exports;
})({});

/* ------------------------------ types ------------------------------ */

var types = _.types = (function (exports) {
    exports = {};

    return exports;
})({});

/* ------------------------------ escapeRegExp ------------------------------ */
_.escapeRegExp = (function (exports) {
    exports = function exports(str) {
        return str.replace(/\W/g, '\\$&');
    };

    return exports;
})({});

/* ------------------------------ has ------------------------------ */

var has = _.has = (function (exports) {
    var hasOwnProp = Object.prototype.hasOwnProperty;

    exports = function exports(obj, key) {
        return hasOwnProp.call(obj, key);
    };

    return exports;
})({});

/* ------------------------------ identity ------------------------------ */

var identity = _.identity = (function (exports) {
    exports = function exports(val) {
        return val;
    };

    return exports;
})({});

/* ------------------------------ repeat ------------------------------ */

var repeat = _.repeat = (function (exports) {
    exports = function exports(str, n) {
        var ret = '';
        if (n < 1) return '';

        while (n > 0) {
            if (n & 1) ret += str;
            n >>= 1;
            str += str;
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ objToStr ------------------------------ */

var objToStr = _.objToStr = (function (exports) {
    var ObjToStr = Object.prototype.toString;

    exports = function exports(val) {
        return ObjToStr.call(val);
    };

    return exports;
})({});

/* ------------------------------ isArgs ------------------------------ */

var isArgs = _.isArgs = (function (exports) {
    exports = function exports(val) {
        return objToStr(val) === '[object Arguments]';
    };

    return exports;
})({});

/* ------------------------------ isNum ------------------------------ */

var isNum = _.isNum = (function (exports) {
    exports = function exports(val) {
        return objToStr(val) === '[object Number]';
    };

    return exports;
})({});

/* ------------------------------ indent ------------------------------ */
_.indent = (function (exports) {
    var regLineBegin = /^(?!\s*$)/gm;

    exports = function exports(str, char, len) {
        if (isNum(char)) {
            len = char;
            char = ' ';
        }

        if (isUndef(len)) len = 4;
        if (isUndef(char)) char = ' ';
        char = repeat(char, len);
        return str.replace(regLineBegin, char);
    };

    return exports;
})({});

/* ------------------------------ isArr ------------------------------ */

var isArr = _.isArr = (function (exports) {
    exports =
        Array.isArray ||
        function(val) {
            return objToStr(val) === '[object Array]';
        };

    return exports;
})({});

/* ------------------------------ isFn ------------------------------ */

var isFn = _.isFn = (function (exports) {
    exports = function exports(val) {
        var objStr = objToStr(val);
        return (
            objStr === '[object Function]' ||
            objStr === '[object GeneratorFunction]'
        );
    };

    return exports;
})({});

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = _.isArrLike = (function (exports) {
    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    exports = function exports(val) {
        if (!val) return false;
        var len = val.length;
        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    };

    return exports;
})({});

/* ------------------------------ isBrowser ------------------------------ */

var isBrowser = _.isBrowser = (function (exports) {
    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }
        return _typeof(obj);
    }

    exports =
        (typeof window === 'undefined' ? 'undefined' : _typeof(window)) ===
            'object' &&
        (typeof document === 'undefined' ? 'undefined' : _typeof(document)) ===
            'object' &&
        document.nodeType === 9;

    return exports;
})({});

/* ------------------------------ root ------------------------------ */

var root = _.root = (function (exports) {
    exports = isBrowser ? window : global;

    return exports;
})({});

/* ------------------------------ detectMocha ------------------------------ */

var detectMocha = _.detectMocha = (function (exports) {
    exports = function exports() {
        for (var i = 0, len = methods.length; i < len; i++) {
            var method = methods[i];
            if (typeof root[method] !== 'function') return false;
        }

        return true;
    };

    var methods = ['afterEach', 'after', 'beforeEach', 'before', 'describe', 'it'];

    return exports;
})({});

/* ------------------------------ keys ------------------------------ */

var keys = _.keys = (function (exports) {
    if (Object.keys && !detectMocha()) {
        exports = Object.keys;
    } else {
        exports = function exports(obj) {
            var ret = [],
                key;

            for (key in obj) {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };
    }

    return exports;
})({});

/* ------------------------------ each ------------------------------ */

var each = _.each = (function (exports) {
    exports = function exports(obj, iterator, ctx) {
        iterator = optimizeCb(iterator, ctx);
        var i, len;

        if (isArrLike(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                iterator(obj[i], i, obj);
            }
        } else {
            var _keys = keys(obj);

            for (i = 0, len = _keys.length; i < len; i++) {
                iterator(obj[_keys[i]], _keys[i], obj);
            }
        }

        return obj;
    };

    return exports;
})({});

/* ------------------------------ createAssigner ------------------------------ */

var createAssigner = _.createAssigner = (function (exports) {
    exports = function exports(keysFn, defaults) {
        return function(obj) {
            each(arguments, function(src, idx) {
                if (idx === 0) return;
                var keys = keysFn(src);
                each(keys, function(key) {
                    if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                });
            });
            return obj;
        };
    };

    return exports;
})({});

/* ------------------------------ defaults ------------------------------ */
_.defaults = (function (exports) {
    exports = createAssigner(allKeys, true);

    return exports;
})({});

/* ------------------------------ extend ------------------------------ */
_.extend = (function (exports) {
    exports = createAssigner(allKeys);

    return exports;
})({});

/* ------------------------------ values ------------------------------ */

var values = _.values = (function (exports) {
    exports = function exports(obj) {
        var ret = [];
        each(obj, function(val) {
            ret.push(val);
        });
        return ret;
    };

    return exports;
})({});

/* ------------------------------ contain ------------------------------ */
_.contain = (function (exports) {
    exports = function exports(arr, val) {
        if (!isArrLike(arr)) arr = values(arr);
        return idxOf(arr, val) >= 0;
    };

    return exports;
})({});

/* ------------------------------ extendOwn ------------------------------ */

var extendOwn = _.extendOwn = (function (exports) {
    exports = createAssigner(keys);

    return exports;
})({});

/* ------------------------------ isStr ------------------------------ */

var isStr = _.isStr = (function (exports) {
    exports = function exports(val) {
        return objToStr(val) === '[object String]';
    };

    return exports;
})({});

/* ------------------------------ isEmpty ------------------------------ */
_.isEmpty = (function (exports) {
    exports = function exports(val) {
        if (val == null) return true;

        if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
            return val.length === 0;
        }

        return keys(val).length === 0;
    };

    return exports;
})({});

/* ------------------------------ isMatch ------------------------------ */

var isMatch = _.isMatch = (function (exports) {
    exports = function exports(obj, src) {
        var _keys = keys(src),
            len = _keys.length;

        if (obj == null) return !len;
        obj = Object(obj);

        for (var i = 0; i < len; i++) {
            var key = _keys[i];
            if (src[key] !== obj[key] || !(key in obj)) return false;
        }

        return true;
    };

    return exports;
})({});

/* ------------------------------ isObj ------------------------------ */

var isObj = _.isObj = (function (exports) {
    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }
        return _typeof(obj);
    }

    exports = function exports(val) {
        var type = _typeof(val);

        return !!val && (type === 'function' || type === 'object');
    };

    return exports;
})({});

/* ------------------------------ isPlainObj ------------------------------ */
_.isPlainObj = (function (exports) {
    exports = function exports(val) {
        if (!isObj(val)) return false;
        var ctor = val.constructor;
        if (!isFn(ctor)) return false;
        if (!has(ctor.prototype, 'isPrototypeOf')) return false;
        return !isArr(val) && !isFn(val);
    };

    return exports;
})({});

/* ------------------------------ isUrl ------------------------------ */
_.isUrl = (function (exports) {
    exports = function exports(val) {
        return regUrl.test(val);
    };

    var regUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

    return exports;
})({});

/* ------------------------------ ltrim ------------------------------ */

var ltrim = _.ltrim = (function (exports) {
    var regSpace = /^\s+/;

    exports = function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        var start = 0,
            len = str.length,
            charLen = chars.length,
            found = true,
            i,
            c;

        while (found && start < len) {
            found = false;
            i = -1;
            c = str.charAt(start);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    start++;
                    break;
                }
            }
        }

        return start >= len ? '' : str.substr(start, len);
    };

    return exports;
})({});

/* ------------------------------ matcher ------------------------------ */

var matcher = _.matcher = (function (exports) {
    exports = function exports(attrs) {
        attrs = extendOwn({}, attrs);
        return function(obj) {
            return isMatch(obj, attrs);
        };
    };

    return exports;
})({});

/* ------------------------------ safeCb ------------------------------ */

var safeCb = _.safeCb = (function (exports) {
    exports = function exports(val, ctx, argCount) {
        if (val == null) return identity;
        if (isFn(val)) return optimizeCb(val, ctx, argCount);
        if (isObj(val)) return matcher(val);
        return function(key) {
            return function(obj) {
                return obj == null ? undefined : obj[key];
            };
        };
    };

    return exports;
})({});

/* ------------------------------ filter ------------------------------ */

var filter = _.filter = (function (exports) {
    exports = function exports(obj, predicate, ctx) {
        var ret = [];
        predicate = safeCb(predicate, ctx);
        each(obj, function(val, idx, list) {
            if (predicate(val, idx, list)) ret.push(val);
        });
        return ret;
    };

    return exports;
})({});

/* ------------------------------ map ------------------------------ */

var map = _.map = (function (exports) {
    exports = function exports(obj, iterator, ctx) {
        iterator = safeCb(iterator, ctx);

        var _keys = !isArrLike(obj) && keys(obj),
            len = (_keys || obj).length,
            results = Array(len);

        for (var i = 0; i < len; i++) {
            var curKey = _keys ? _keys[i] : i;
            results[i] = iterator(obj[curKey], curKey, obj);
        }

        return results;
    };

    return exports;
})({});

/* ------------------------------ noop ------------------------------ */
_.noop = (function (exports) {
    exports = function exports() {};

    return exports;
})({});

/* ------------------------------ now ------------------------------ */
_.now = (function (exports) {
    exports =
        Date.now ||
        function() {
            return new Date().getTime();
        };

    return exports;
})({});

/* ------------------------------ toStr ------------------------------ */

var toStr = _.toStr = (function (exports) {
    exports = function exports(val) {
        return val == null ? '' : val.toString();
    };

    return exports;
})({});

/* ------------------------------ rpad ------------------------------ */
_.rpad = (function (exports) {
    exports = function exports(str, len, chars) {
        str = toStr(str);
        var strLen = str.length;
        chars = chars || ' ';
        if (strLen < len) str = (str + repeat(chars, len - strLen)).slice(0, len);
        return str;
    };

    return exports;
})({});

/* ------------------------------ rtrim ------------------------------ */

var rtrim = _.rtrim = (function (exports) {
    var regSpace = /\s+$/;

    exports = function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        var end = str.length - 1,
            charLen = chars.length,
            found = true,
            i,
            c;

        while (found && end >= 0) {
            found = false;
            i = -1;
            c = str.charAt(end);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    end--;
                    break;
                }
            }
        }

        return end >= 0 ? str.substring(0, end + 1) : '';
    };

    return exports;
})({});

/* ------------------------------ trim ------------------------------ */

var trim = _.trim = (function (exports) {
    var regSpace = /^\s+|\s+$/g;

    exports = function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        return ltrim(rtrim(str, chars), chars);
    };

    return exports;
})({});

/* ------------------------------ extractBlockCmts ------------------------------ */
_.extractBlockCmts = (function (exports) {
    var regBlockCmt = /(\/\*[\s\S]*?\*\/)/gm;

    exports = function exports(str) {
        var ret = str.match(regBlockCmt);
        if (!ret) return [];
        ret = map(ret, function(comment) {
            return trim(
                map(comment.split('\n'), function(line) {
                    return trim(line).replace(/^\/\*+|\*+\/$|^\*+/g, '');
                }).join('\n')
            );
        });
        return ret;
    };

    return exports;
})({});

/* ------------------------------ some ------------------------------ */
_.some = (function (exports) {
    exports = function exports(obj, predicate, ctx) {
        predicate = safeCb(predicate, ctx);

        var _keys = !isArrLike(obj) && keys(obj),
            len = (_keys || obj).length;

        for (var i = 0; i < len; i++) {
            var key = _keys ? _keys[i] : i;
            if (predicate(obj[key], key, obj)) return true;
        }

        return false;
    };

    return exports;
})({});

/* ------------------------------ startWith ------------------------------ */
_.startWith = (function (exports) {
    exports = function exports(str, prefix) {
        return str.indexOf(prefix) === 0;
    };

    return exports;
})({});

/* ------------------------------ stripCmt ------------------------------ */
_.stripCmt = (function (exports) {
    exports = function exports(str) {
        str = ('__' + str + '__').split('');
        var mode = {
            singleQuote: false,
            doubleQuote: false,
            regex: false,
            blockComment: false,
            lineComment: false,
            condComp: false
        };

        for (var i = 0, l = str.length; i < l; i++) {
            if (mode.regex) {
                if (str[i] === '/' && str[i - 1] !== '\\') mode.regex = false;
                continue;
            }

            if (mode.singleQuote) {
                if (str[i] === "'" && str[i - 1] !== '\\') mode.singleQuote = false;
                continue;
            }

            if (mode.doubleQuote) {
                if (str[i] === '"' && str[i - 1] !== '\\') mode.doubleQuote = false;
                continue;
            }

            if (mode.blockComment) {
                if (str[i] === '*' && str[i + 1] === '/') {
                    str[i + 1] = '';
                    mode.blockComment = false;
                }

                str[i] = '';
                continue;
            }

            if (mode.lineComment) {
                if (str[i + 1] === '\n') mode.lineComment = false;
                str[i] = '';
                continue;
            }

            mode.doubleQuote = str[i] === '"';
            mode.singleQuote = str[i] === "'";

            if (str[i] === '/') {
                if (str[i + 1] === '*') {
                    str[i] = '';
                    mode.blockComment = true;
                    continue;
                }

                if (str[i + 1] === '/') {
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

/* ------------------------------ stripColor ------------------------------ */
_.stripColor = (function (exports) {
    var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

    exports = function exports(str) {
        return str.replace(regColor, '');
    };

    return exports;
})({});

/* ------------------------------ toArr ------------------------------ */
_.toArr = (function (exports) {
    exports = function exports(val) {
        if (!val) return [];
        if (isArr(val)) return val;
        if (isArrLike(val) && !isStr(val)) return map(val);
        return [val];
    };

    return exports;
})({});

/* ------------------------------ topoSort ------------------------------ */
_.topoSort = (function (exports) {
    exports = function exports(edges) {
        return sort(uniqueNodes(edges), edges);
    };

    function uniqueNodes(arr) {
        var ret = [];

        for (var i = 0, len = arr.length; i < len; i++) {
            var edge = arr[i];
            if (ret.indexOf(edge[0]) < 0) ret.push(edge[0]);
            if (ret.indexOf(edge[1]) < 0) ret.push(edge[1]);
        }

        return ret;
    }

    function sort(nodes, edges) {
        var cursor = nodes.length,
            sorted = new Array(cursor),
            visited = {},
            i = cursor;

        while (i--) {
            if (!visited[i]) visit(nodes[i], i, []);
        }

        function visit(node, i, predecessors) {
            if (predecessors.indexOf(node) >= 0) {
                throw new Error('Cyclic dependency: ' + JSON.stringify(node));
            }

            if (visited[i]) return;
            visited[i] = true;
            var outgoing = edges.filter(function(edge) {
                return edge[0] === node;
            });

            if ((i = outgoing.length)) {
                var preds = predecessors.concat(node);

                do {
                    var child = outgoing[--i][1];
                    visit(child, nodes.indexOf(child), preds);
                } while (i);
            }

            sorted[--cursor] = node;
        }

        return sorted;
    }

    return exports;
})({});

/* ------------------------------ unique ------------------------------ */
_.unique = (function (exports) {
    exports = function exports(arr, compare) {
        compare = compare || isEqual;
        return filter(arr, function(item, idx, arr) {
            var len = arr.length;

            while (++idx < len) {
                if (compare(item, arr[idx])) return false;
            }

            return true;
        });
    };

    function isEqual(a, b) {
        return a === b;
    }

    return exports;
})({});

module.exports = _;