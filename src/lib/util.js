// Built by eustia.
/* eslint-disable */

var _ = {};

/* ------------------------------ ansiColor ------------------------------ */

var ansiColor = _.ansiColor = (function (exports) {
    exports = {
        black: genColor([0, 0]),
        red: genColor([31, 39]),
        green: genColor([32, 39]),
        yellow: genColor([33, 39]),
        blue: genColor([34, 39]),
        magenta: genColor([35, 39]),
        cyan: genColor([36, 39]),
        white: genColor([37, 39]),
        gray: genColor([90, 39]),
        grey: genColor([90, 39]),
        bgBlack: genColor([40, 49]),
        bgRed: genColor([41, 49]),
        bgGreen: genColor([42, 49]),
        bgYellow: genColor([43, 49]),
        bgBlue: genColor([44, 49]),
        bgMagenta: genColor([45, 49]),
        bgCyan: genColor([46, 49]),
        bgWhite: genColor([47, 49]),
        blackBright: genColor([90, 39]),
        redBright: genColor([91, 39]),
        greenBright: genColor([92, 39]),
        yellowBright: genColor([93, 39]),
        blueBright: genColor([94, 39]),
        magentaBright: genColor([95, 39]),
        cyanBright: genColor([96, 39]),
        whiteBright: genColor([97, 39]),
        bgBlackBright: genColor([100, 49]),
        bgRedBright: genColor([101, 49]),
        bgGreenBright: genColor([102, 49]),
        bgYellowBright: genColor([103, 49]),
        bgBlueBright: genColor([104, 49]),
        bgMagentaBright: genColor([105, 49]),
        bgCyanBright: genColor([106, 49]),
        bgWhiteBright: genColor([107, 49])
    };

    function genColor(codes) {
        const open = `\u001b[${codes[0]}m`;
        const close = `\u001b[${codes[1]}m`;

        return input => open + input + close;
    }

    return exports;
})({});

/* ------------------------------ has ------------------------------ */

var has = _.has = (function (exports) {
    var hasOwnProp = Object.prototype.hasOwnProperty;

    exports = function(obj, key) {
        return hasOwnProp.call(obj, key);
    };

    return exports;
})({});

/* ------------------------------ keys ------------------------------ */

var keys = _.keys = (function (exports) {
    if (Object.keys && !false) {
        exports = Object.keys;
    } else {
        exports = function(obj) {
            var ret = [];

            for (var key in obj) {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };
    }

    return exports;
})({});

/* ------------------------------ max ------------------------------ */

var max = _.max = (function (exports) {
    exports = function() {
        var arr = arguments;
        var ret = arr[0];

        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] > ret) ret = arr[i];
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ isObj ------------------------------ */

var isObj = _.isObj = (function (exports) {
    exports = function(val) {
        var type = typeof val;
        return !!val && (type === 'function' || type === 'object');
    };

    return exports;
})({});

/* ------------------------------ idxOf ------------------------------ */

var idxOf = _.idxOf = (function (exports) {
    exports = function(arr, val, fromIdx) {
        return Array.prototype.indexOf.call(arr, val, fromIdx);
    };

    return exports;
})({});

/* ------------------------------ isUndef ------------------------------ */

var isUndef = _.isUndef = (function (exports) {
    exports = function(val) {
        return val === void 0;
    };

    return exports;
})({});

/* ------------------------------ types ------------------------------ */

var types = _.types = (function (exports) {
    exports = {};

    return exports;
})({});

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = _.optimizeCb = (function (exports) {
    exports = function(fn, ctx, argCount) {
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

/* ------------------------------ escape ------------------------------ */

var escape = _.escape = (function (exports) {
    exports = function(str) {
        return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
    };

    var map = (exports.map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    });
    var regSrc = '(?:' + keys(map).join('|') + ')';
    var regTest = new RegExp(regSrc);
    var regReplace = new RegExp(regSrc, 'g');

    var replaceFn = function(match) {
        return map[match];
    };

    return exports;
})({});

/* ------------------------------ toStr ------------------------------ */

var toStr = _.toStr = (function (exports) {
    exports = function(val) {
        return val == null ? '' : val.toString();
    };

    return exports;
})({});

/* ------------------------------ escapeJsStr ------------------------------ */

var escapeJsStr = _.escapeJsStr = (function (exports) {
    exports = function(str) {
        return toStr(str).replace(regEscapeChars, function(char) {
            switch (char) {
                case '"':
                case "'":
                case '\\':
                    return '\\' + char;

                case '\n':
                    return '\\n';

                case '\r':
                    return '\\r';
                // Line separator

                case '\u2028':
                    return '\\u2028';
                // Paragraph separator

                case '\u2029':
                    return '\\u2029';
            }
        });
    };

    var regEscapeChars = /["'\\\n\r\u2028\u2029]/g;

    return exports;
})({});

/* ------------------------------ escapeRegExp ------------------------------ */
_.escapeRegExp = (function (exports) {
    exports = function(str) {
        return str.replace(/\W/g, '\\$&');
    };

    return exports;
})({});

/* ------------------------------ identity ------------------------------ */

var identity = _.identity = (function (exports) {
    exports = function(val) {
        return val;
    };

    return exports;
})({});

/* ------------------------------ repeat ------------------------------ */

var repeat = _.repeat = (function (exports) {
    exports = function(str, n) {
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

/* ------------------------------ rpad ------------------------------ */

var rpad = _.rpad = (function (exports) {
    exports = function(str, len, chars) {
        str = toStr(str);
        var strLen = str.length;
        chars = chars || ' ';
        if (strLen < len) str = (str + repeat(chars, len - strLen)).slice(0, len);
        return str;
    };

    return exports;
})({});

/* ------------------------------ objToStr ------------------------------ */

var objToStr = _.objToStr = (function (exports) {
    var ObjToStr = Object.prototype.toString;

    exports = function(val) {
        return ObjToStr.call(val);
    };

    return exports;
})({});

/* ------------------------------ isArgs ------------------------------ */

var isArgs = _.isArgs = (function (exports) {
    exports = function(val) {
        return objToStr(val) === '[object Arguments]';
    };

    return exports;
})({});

/* ------------------------------ isArr ------------------------------ */

var isArr = _.isArr = (function (exports) {
    if (Array.isArray && !false) {
        exports = Array.isArray;
    } else {
        exports = function(val) {
            return objToStr(val) === '[object Array]';
        };
    }

    return exports;
})({});

/* ------------------------------ castPath ------------------------------ */

var castPath = _.castPath = (function (exports) {
    exports = function(str, obj) {
        if (isArr(str)) return str;
        if (obj && has(obj, str)) return [str];
        var ret = [];
        str.replace(regPropName, function(match, number, quote, str) {
            ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
        });
        return ret;
    }; 

    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var regEscapeChar = /\\(\\)?/g;

    return exports;
})({});

/* ------------------------------ isFn ------------------------------ */

var isFn = _.isFn = (function (exports) {
    exports = function(val) {
        var objStr = objToStr(val);
        return (
            objStr === '[object Function]' ||
            objStr === '[object GeneratorFunction]' ||
            objStr === '[object AsyncFunction]'
        );
    };

    return exports;
})({});

/* ------------------------------ getProto ------------------------------ */

var getProto = _.getProto = (function (exports) {
    var getPrototypeOf = Object.getPrototypeOf;
    var ObjectCtr = {}.constructor;

    exports = function(obj) {
        if (!isObj(obj)) return;
        if (getPrototypeOf && !false) return getPrototypeOf(obj);
        var proto = obj.__proto__;
        if (proto || proto === null) return proto;
        if (isFn(obj.constructor)) return obj.constructor.prototype;
        if (obj instanceof ObjectCtr) return ObjectCtr.prototype;
    };

    return exports;
})({});

/* ------------------------------ isNum ------------------------------ */

var isNum = _.isNum = (function (exports) {
    exports = function(val) {
        return objToStr(val) === '[object Number]';
    };

    return exports;
})({});

/* ------------------------------ indent ------------------------------ */
_.indent = (function (exports) {
    var regLineBegin = /^(?!\s*$)/gm;

    exports = function(str, char, len) {
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

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = _.isArrLike = (function (exports) {
    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    exports = function(val) {
        if (!val) return false;
        var len = val.length;
        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    };

    return exports;
})({});

/* ------------------------------ each ------------------------------ */

var each = _.each = (function (exports) {
    exports = function(obj, iterator, ctx) {
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
    exports = function(keysFn, defaults) {
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

/* ------------------------------ extendOwn ------------------------------ */

var extendOwn = _.extendOwn = (function (exports) {
    exports = createAssigner(keys);

    return exports;
})({});

/* ------------------------------ values ------------------------------ */

var values = _.values = (function (exports) {
    exports = function(obj) {
        var ret = [];
        each(obj, function(val) {
            ret.push(val);
        });
        return ret;
    };

    return exports;
})({});

/* ------------------------------ isStr ------------------------------ */

var isStr = _.isStr = (function (exports) {
    exports = function(val) {
        return objToStr(val) === '[object String]';
    };

    return exports;
})({});

/* ------------------------------ contain ------------------------------ */
_.contain = (function (exports) {
    exports = function(arr, val) {
        if (isStr(arr)) return arr.indexOf(val) > -1;
        if (!isArrLike(arr)) arr = values(arr);
        return idxOf(arr, val) >= 0;
    };

    return exports;
})({});

/* ------------------------------ isBrowser ------------------------------ */
_.isBrowser = (function (exports) {
    exports =
        typeof window === 'object' &&
        typeof document === 'object' &&
        document.nodeType === 9;

    return exports;
})({});

/* ------------------------------ isEmpty ------------------------------ */
_.isEmpty = (function (exports) {
    exports = function(val) {
        if (val == null) return true;

        if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
            return val.length === 0;
        }

        return keys(val).length === 0;
    };

    return exports;
})({});

/* ------------------------------ isInt ------------------------------ */

var isInt = _.isInt = (function (exports) {
    exports = function(val) {
        return isNum(val) && val % 1 === 0;
    };

    return exports;
})({});

/* ------------------------------ isFullWidth ------------------------------ */

var isFullWidth = _.isFullWidth = (function (exports) {
    exports = function isFullWidth(c) {
        if (!isInt(c)) {
            return false;
        }

        return (
            c >= 0x1100 &&
            (c <= 0x115f ||
                c === 0x2329 ||
                c === 0x232a ||
                (0x2e80 <= c && c <= 0x3247 && c !== 0x303f) ||
                (0x3250 <= c && c <= 0x4dbf) ||
                (0x4e00 <= c && c <= 0xa4c6) ||
                (0xa960 <= c && c <= 0xa97c) ||
                (0xac00 <= c && c <= 0xd7a3) ||
                (0xf900 <= c && c <= 0xfaff) ||
                (0xfe10 <= c && c <= 0xfe19) ||
                (0xfe30 <= c && c <= 0xfe6b) ||
                (0xff01 <= c && c <= 0xff60) ||
                (0xffe0 <= c && c <= 0xffe6) ||
                (0x1b000 <= c && c <= 0x1b001) ||
                (0x1f200 <= c && c <= 0x1f251) ||
                (0x20000 <= c && c <= 0x3fffd))
        );
    };

    return exports;
})({});

/* ------------------------------ isMatch ------------------------------ */

var isMatch = _.isMatch = (function (exports) {
    exports = function(obj, src) {
        var _keys = keys(src);

        var len = _keys.length;
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

/* ------------------------------ isPlainObj ------------------------------ */
_.isPlainObj = (function (exports) {
    exports = function(val) {
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
    exports = function(val) {
        return regUrl.test(val);
    };

    var regUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

    return exports;
})({});

/* ------------------------------ ltrim ------------------------------ */

var ltrim = _.ltrim = (function (exports) {
    var regSpace = /^\s+/;

    exports = function(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        var start = 0;
        var len = str.length;
        var charLen = chars.length;
        var found = true;
        var i;
        var c;

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
    exports = function(attrs) {
        attrs = extendOwn({}, attrs);
        return function(obj) {
            return isMatch(obj, attrs);
        };
    };

    return exports;
})({});

/* ------------------------------ min ------------------------------ */

var min = _.min = (function (exports) {
    exports = function() {
        var arr = arguments;
        var ret = arr[0];

        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] < ret) ret = arr[i];
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ noop ------------------------------ */
_.noop = (function (exports) {
    exports = function() {};

    return exports;
})({});

/* ------------------------------ now ------------------------------ */
_.now = (function (exports) {
    if (Date.now && !false) {
        exports = Date.now;
    } else {
        exports = function() {
            return new Date().getTime();
        };
    }

    return exports;
})({});

/* ------------------------------ safeGet ------------------------------ */

var safeGet = _.safeGet = (function (exports) {
    exports = function(obj, path) {
        path = castPath(path, obj);
        var prop;
        prop = path.shift();

        while (!isUndef(prop)) {
            obj = obj[prop];
            if (obj == null) return;
            prop = path.shift();
        }

        return obj;
    };

    return exports;
})({});

/* ------------------------------ property ------------------------------ */

var property = _.property = (function (exports) {
    exports = function(path) {
        if (!isArr(path)) return shallowProperty(path);
        return function(obj) {
            return safeGet(obj, path);
        };
    };

    function shallowProperty(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    }

    return exports;
})({});

/* ------------------------------ safeCb ------------------------------ */

var safeCb = _.safeCb = (function (exports) {
    exports = function(val, ctx, argCount) {
        if (val == null) return identity;
        if (isFn(val)) return optimizeCb(val, ctx, argCount);
        if (isObj(val) && !isArr(val)) return matcher(val);
        return property(val);
    };

    return exports;
})({});

/* ------------------------------ filter ------------------------------ */

var filter = _.filter = (function (exports) {
    exports = function(obj, predicate, ctx) {
        var ret = [];
        predicate = safeCb(predicate, ctx);
        each(obj, function(val, idx, list) {
            if (predicate(val, idx, list)) ret.push(val);
        });
        return ret;
    };

    return exports;
})({});

/* ------------------------------ unique ------------------------------ */

var unique = _.unique = (function (exports) {
    exports = function(arr, cmp) {
        cmp = cmp || isEqual;
        return filter(arr, function(item, idx, arr) {
            var len = arr.length;

            while (++idx < len) {
                if (cmp(item, arr[idx])) return false;
            }

            return true;
        });
    };

    function isEqual(a, b) {
        return a === b;
    }

    return exports;
})({});

/* ------------------------------ allKeys ------------------------------ */

var allKeys = _.allKeys = (function (exports) {
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;

    exports = function(obj) {
        var _ref =
                arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {},
            _ref$prototype = _ref.prototype,
            prototype = _ref$prototype === void 0 ? true : _ref$prototype,
            _ref$unenumerable = _ref.unenumerable,
            unenumerable = _ref$unenumerable === void 0 ? false : _ref$unenumerable,
            _ref$symbol = _ref.symbol,
            symbol = _ref$symbol === void 0 ? false : _ref$symbol;

        var ret = [];

        if ((unenumerable || symbol) && getOwnPropertyNames) {
            var getKeys = keys;
            if (unenumerable && getOwnPropertyNames) getKeys = getOwnPropertyNames;

            do {
                ret = ret.concat(getKeys(obj));

                if (symbol && getOwnPropertySymbols) {
                    ret = ret.concat(getOwnPropertySymbols(obj));
                }
            } while (
                prototype &&
                (obj = getProto(obj)) &&
                obj !== Object.prototype
            );

            ret = unique(ret);
        } else {
            if (prototype) {
                for (var key in obj) {
                    ret.push(key);
                }
            } else {
                ret = keys(obj);
            }
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ defaults ------------------------------ */

var defaults = _.defaults = (function (exports) {
    exports = createAssigner(allKeys, true);

    return exports;
})({});

/* ------------------------------ template ------------------------------ */

var template = _.template = (function (exports) {
    var regMatcher = /<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;

    exports = function(str, util) {
        if (!util) {
            util =
                typeof _ === 'object'
                    ? _
                    : {
                          escape: escape
                      };
        } else {
            defaults(util, {
                escape: escape
            });
        }

        var index = 0;
        var src = "__p+='";
        str.replace(regMatcher, function(
            match,
            escape,
            interpolate,
            evaluate,
            offset
        ) {
            src += escapeJsStr(str.slice(index, offset));
            index = offset + match.length;

            if (escape) {
                src += "'+\n((__t=(".concat(
                    escape,
                    "))==null?'':util.escape(__t))+\n'"
                );
            } else if (interpolate) {
                src += "'+\n((__t=(".concat(interpolate, "))==null?'':__t)+\n'");
            } else if (evaluate) {
                src += "';\n".concat(evaluate, "\n__p+='");
            }

            return match;
        });
        src += "';\n";
        src = 'with(obj||{}){\n'.concat(src, '}\n');
        src = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n".concat(
            src,
            'return __p;\n'
        );
        var render = new Function('obj', 'util', src);
        return function(data) {
            return render.call(null, data, util);
        };
    };

    return exports;
})({});

/* ------------------------------ extend ------------------------------ */
_.extend = (function (exports) {
    exports = createAssigner(allKeys);

    return exports;
})({});

/* ------------------------------ map ------------------------------ */

var map = _.map = (function (exports) {
    exports = function(obj, iterator, ctx) {
        iterator = safeCb(iterator, ctx);

        var _keys = !isArrLike(obj) && keys(obj);

        var len = (_keys || obj).length;
        var results = Array(len);

        for (var i = 0; i < len; i++) {
            var curKey = _keys ? _keys[i] : i;
            results[i] = iterator(obj[curKey], curKey, obj);
        }

        return results;
    };

    return exports;
})({});

/* ------------------------------ toArr ------------------------------ */

var toArr = _.toArr = (function (exports) {
    exports = function(val) {
        if (!val) return [];
        if (isArr(val)) return val;
        if (isArrLike(val) && !isStr(val)) return map(val);
        return [val];
    };

    return exports;
})({});

/* ------------------------------ mapObj ------------------------------ */

var mapObj = _.mapObj = (function (exports) {
    exports = function(obj, iterator, ctx) {
        iterator = safeCb(iterator, ctx);

        var _keys = keys(obj);

        var len = _keys.length;
        var ret = {};

        for (var i = 0; i < len; i++) {
            var curKey = _keys[i];
            ret[curKey] = iterator(obj[curKey], curKey, obj);
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ cloneDeep ------------------------------ */

var cloneDeep = _.cloneDeep = (function (exports) {
    exports = function(obj) {
        if (isArr(obj)) {
            return obj.map(function(val) {
                return exports(val);
            });
        }

        if (isObj(obj) && !isFn(obj)) {
            return mapObj(obj, function(val) {
                return exports(val);
            });
        }

        return obj;
    };

    return exports;
})({});

/* ------------------------------ rtrim ------------------------------ */

var rtrim = _.rtrim = (function (exports) {
    var regSpace = /\s+$/;

    exports = function(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        var end = str.length - 1;
        var charLen = chars.length;
        var found = true;
        var i;
        var c;

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

    exports = function(str, chars) {
        if (chars == null) return str.replace(regSpace, '');
        return ltrim(rtrim(str, chars), chars);
    };

    return exports;
})({});

/* ------------------------------ extractBlockCmts ------------------------------ */
_.extractBlockCmts = (function (exports) {
    var regBlockCmt = /(\/\*[\s\S]*?\*\/)/gm;

    exports = function(str) {
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
    exports = function(obj, predicate, ctx) {
        predicate = safeCb(predicate, ctx);

        var _keys = !isArrLike(obj) && keys(obj);

        var len = (_keys || obj).length;

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
    exports = function(str, prefix) {
        return str.indexOf(prefix) === 0;
    };

    return exports;
})({});

/* ------------------------------ stripAnsi ------------------------------ */

var stripAnsi = _.stripAnsi = (function (exports) {
    var regAnsi = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

    exports = function(str) {
        return str.replace(regAnsi, '');
    };

    return exports;
})({});

/* ------------------------------ strWidth ------------------------------ */

var strWidth = _.strWidth = (function (exports) {
    exports = function(str) {
        str = stripAnsi(str);
        var width = 0;

        for (var i = 0, len = str.length; i < len; i++) {
            var c = str.codePointAt(i); 

            if (c <= 31 || c === 127) {
                continue;
            }

            width += isFullWidth(c) ? 2 : 1;
        }

        return width;
    };

    return exports;
})({});

/* ------------------------------ cliHelp ------------------------------ */
_.cliHelp = (function (exports) {
    exports = function(data) {
        data = cloneDeep(data);
        data.usage = toArr(data.usage);

        if (data.commands) {
            var cmdNameWidths = map(data.commands, function(command) {
                return strWidth(command.name);
            });
            data.maxNameWidth = max.apply(null, cmdNameWidths);
            return helpTpl(data);
        }

        each(data.options, function(option) {
            option.name =
                (option.shorthand ? '-' + option.shorthand + ', ' : '    ') +
                '--' +
                option.name;
        });
        var optNameWidths = map(data.options, function(option) {
            return strWidth(option.name);
        });
        data.maxNameWidth = max.apply(null, optNameWidths);
        return cmdTpl(data);
    };

    var tplUtil = {
        each: each
    };

    tplUtil.rpad = function(text, len) {
        return rpad(text, len, ' ');
    };

    each(['yellow', 'green', 'cyan', 'red', 'white', 'magenta'], function(color) {
        tplUtil[color] = function(text) {
            return ansiColor[color](text);
        };
    });
    var cmdTpl = template(
        [
            'Usage:',
            '',
            "<% util.each(usage, function (value) { %>  <%=util.cyan(name)%> <%=value%><%='\\n'%><% }); %>",
            '<% if (options) { %>Options:',
            '',
            "<%     util.each(options, function (option) { %>  <%=util.yellow(util.rpad(option.name, maxNameWidth))%> <%=option.desc%><%='\\n'%><% }); %>",
            '<% } %>Description:',
            '',
            '  <%=desc%>'
        ].join('\n'),
        tplUtil
    );
    var helpTpl = template(
        [
            'Usage:',
            '',
            "<% util.each(usage, function (value) { %>  <%=util.cyan(name)%> <%=value%><%='\\n'%><% }); %>",
            'Commands:',
            '',
            "<% util.each(commands, function (command) { %>  <%=util.yellow(util.rpad(command.name, maxNameWidth))%> <%=command.desc%><%='\\n'%><% }); %>",
            "Run '<%=util.cyan(name + ' help <command>')%>' for more information on a specific command"
        ].join('\n'),
        tplUtil
    );

    return exports;
})({});

/* ------------------------------ stripCmt ------------------------------ */
_.stripCmt = (function (exports) {
    exports = function(str) {
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

    exports = function(str) {
        return str.replace(regColor, '');
    };

    return exports;
})({});

/* ------------------------------ stripIndent ------------------------------ */
_.stripIndent = (function (exports) {
    exports = function(literals) {
        if (isStr(literals)) literals = toArr(literals);
        var str = '';

        for (
            var _len = arguments.length,
                placeholders = new Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
            _key < _len;
            _key++
        ) {
            placeholders[_key - 1] = arguments[_key];
        }

        for (var i = 0, len = literals.length; i < len; i++) {
            str += literals[i];
            if (placeholders[i]) str += placeholders[i];
        }

        var lines = str.split('\n');
        var indentLens = [];

        for (var _i = 0, _len2 = lines.length; _i < _len2; _i++) {
            var line = lines[_i];

            var _indent = line.match(regStartSpaces);

            if (_indent) {
                indentLens.push(_indent[1].length);
            }
        }

        var indent = indentLens.length > 0 ? min.apply(null, indentLens) : 0;
        return trim(
            map(lines, function(line) {
                return line[0] === ' ' ? line.slice(indent) : line;
            }).join('\n')
        );
    };

    var regStartSpaces = /^(\s+)\S+/;

    return exports;
})({});

/* ------------------------------ topoSort ------------------------------ */
_.topoSort = (function (exports) {
    exports = function(edges) {
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
        var cursor = nodes.length;
        var sorted = new Array(cursor);
        var visited = {};
        var i = cursor;

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

module.exports = _;
//# sourceMappingURL=util.js.map