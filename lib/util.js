// Built by eustia.
"use strict";

var _ = {};

/* ------------------------------ inherits ------------------------------ */

var inherits = _.inherits = (function () {
    /* Inherit the prototype methods from one constructor into another.
     *
     * |Name      |Type    |Desc       |
     * |----------|--------|-----------|
     * |Class     |function|Child Class|
     * |SuperClass|function|Super Class|
     *
     * ```javascript
     * function People(name)
     * {
     *     this._name = name;
     * }
     * People.prototype = {
     *     getName: function ()
     *     {
     *         return this._name;
     *     }
     * };
     * function Student(name)
     * {
     *     this._name = name;
     * }
     * inherits(Student, People);
     * var s = new Student('RedHood');
     * s.getName(); // -> 'RedHood'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(Class, SuperClass)
    {
        if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

        noop.prototype = SuperClass.prototype;
        Class.prototype = new noop();
    }

    var objCreate = Object.create;

    function noop() {}

    return exports;
})();

/* ------------------------------ has ------------------------------ */

var has = _.has = (function () {
    /* Checks if key is a direct property.
     *
     * |Name  |Type   |Desc                            |
     * |------|-------|--------------------------------|
     * |obj   |object |Object to query                 |
     * |key   |string |Path to check                   |
     * |return|boolean|True if key is a direct property|
     *
     * ```javascript
     * has({one: 1}, 'one'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var hasOwnProp = Object.prototype.hasOwnProperty;

    function exports(obj, key)
    {
        return hasOwnProp.call(obj, key);
    }

    return exports;
})();

/* ------------------------------ allKeys ------------------------------ */

var allKeys = _.allKeys = (function () {
    /* Retrieve all the names of object's own and inherited properties.
     *
     * |Name  |Type  |Desc                       |
     * |------|------|---------------------------|
     * |obj   |object|Object to query            |
     * |return|array |Array of all property names|
     *
     * > Members of Object's prototype won't be retrieved.
     *
     * ```javascript
     * var obj = Object.create({zero: 0});
     * obj.one = 1;
     * allKeys(obj) // -> ['zero', 'one']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(obj)
    {
        var ret = [], key;

        for (key in obj) ret.push(key);

        return ret;
    }

    return exports;
})();

/* ------------------------------ idxOf ------------------------------ */

var idxOf = _.idxOf = (function () {
    /* Get the index at which the first occurrence of value.
     *
     * |Name     |Type  |Desc                |
     * |---------|------|--------------------|
     * |arr      |array |Array to search     |
     * |val      |*     |Value to search for |
     * |fromIdx=0|number|Index to search from|
     *
     * ```javascript
     * idxOf([1, 2, 1, 2], 2, 2); // -> 3
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(arr, val, fromIdx)
    {
        return Array.prototype.indexOf.call(arr, val, fromIdx);
    }

    return exports;
})();

/* ------------------------------ isUndef ------------------------------ */

var isUndef = _.isUndef = (function () {
    /* Check if value is undefined.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is undefined|
     *
     * ```javascript
     * isUndef(void 0); // -> true
     * isUndef(null); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val)
    {
        return val === void 0;
    }

    return exports;
})();

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = _.optimizeCb = (function () {
    /* Used for function context binding.
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef 
     */

    function exports(fn, ctx, argCount)
    {
        if (isUndef(ctx)) return fn;

        switch (argCount == null ? 3 : argCount)
        {
            case 1: return function (val)
            {
                return fn.call(ctx, val);
            };
            case 3: return function (val, idx, collection)
            {
                return fn.call(ctx, val, idx, collection);
            };
            case 4: return function (accumulator, val, idx, collection)
            {
                return fn.call(ctx, accumulator, val, idx, collection);
            };
        }

        return function ()
        {
            return fn.apply(ctx, arguments);
        };
    }

    return exports;
})();

/* ------------------------------ escapeRegExp ------------------------------ */
_.escapeRegExp = (function () {
    /* Escape special chars to be used as literals in RegExp constructors.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to escape|
     * |return|string|Escaped string  |
     *
     * ```javascript
     * escapeRegExp('[licia]'); // -> '\\[licia\\]'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str)
    {
        return str.replace(/\W/g, '\\$&');
    }

    return exports;
})();

/* ------------------------------ identity ------------------------------ */

var identity = _.identity = (function () {
    /* Return the first argument given.
     *
     * |Name  |Type|Desc       |
     * |------|----|-----------|
     * |val   |*   |Any value  |
     * |return|*   |Given value|
     *
     * ```javascript
     * identity('a'); // -> 'a'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val)
    {
        return val;
    }

    return exports;
})();

/* ------------------------------ repeat ------------------------------ */

var repeat = _.repeat = (function (exports) {
    /* Repeat string n-times.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to repeat|
     * |n     |number|Repeat times    |
     * |return|string|Repeated string |
     *
     * ```javascript
     * repeat('a', 3); // -> 'aaa'
     * repeat('ab', 2); // -> 'abab'
     * repeat('*', 0); // -> ''
     * ```
     */

    /* module
     * env: all
     * test: all
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

/* ------------------------------ objToStr ------------------------------ */

var objToStr = _.objToStr = (function () {
    /* Alias of Object.prototype.toString.
     *
     * |Name  |Type  |Desc                                |
     * |------|------|------------------------------------|
     * |value |*     |Source value                        |
     * |return|string|String representation of given value|
     * 
     * ```javascript
     * objToStr(5); // -> '[object Number]'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var ObjToStr = Object.prototype.toString;

    function exports(val)
    {
        return ObjToStr.call(val);
    }

    return exports;
})();

/* ------------------------------ isArgs ------------------------------ */

var isArgs = _.isArgs = (function () {
    /* Check if value is classified as an arguments object.
     *
     * |Name  |Type   |Desc                                |
     * |------|-------|------------------------------------|
     * |val   |*      |Value to check                      |
     * |return|boolean|True if value is an arguments object|
     *
     * ```javascript
     * (function () {
     *     isArgs(arguments); // -> true
     * })();
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        return objToStr(val) === '[object Arguments]';
    }

    return exports;
})();

/* ------------------------------ isArr ------------------------------ */

var isArr = _.isArr = (function (exports) {
    /* Check if value is an `Array` object.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |val   |*      |Value to check                    |
     * |return|boolean|True if value is an `Array` object|
     *
     * ```javascript
     * isArr([]); // -> true
     * isArr({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    exports = Array.isArray || function (val)
    {
        return objToStr(val) === '[object Array]';
    };

    return exports;
})({});

/* ------------------------------ castPath ------------------------------ */

var castPath = _.castPath = (function () {
    /* Cast value into a property path array.
     *
     * |Name  |Type  |Desc               |
     * |------|------|-------------------|
     * |str   |*     |Value to inspect   |
     * |[obj] |object|Object to query    |
     * |return|array |Property path array|
     * 
     * ```javascript
     * castPath('a.b.c'); // -> ['a', 'b', 'c']
     * castPath(['a']); // -> ['a']
     * castPath('a[0].b'); // -> ['a', '0', 'b']
     * castPath('a.b.c', {'a.b.c': true}); // -> ['a.b.c']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has isArr 
     */

    function exports(str, obj) 
    {
        if (isArr(str)) return str;
        if (obj && has(obj, str)) return [str];

        var ret = [];

        str.replace(regPropName, function(match, number, quote, str) 
        {
            ret.push(quote ? str.replace(regEscapeChar, '$1') : (number || match));
        });

        return ret;
    }

    // Lodash _stringToPath
    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regEscapeChar = /\\(\\)?/g;

    return exports;
})();

/* ------------------------------ safeGet ------------------------------ */

var safeGet = _.safeGet = (function () {
    /* Get object property, don't throw undefined error.
     *
     * |Name  |Type        |Desc                     |
     * |------|------------|-------------------------|
     * |obj   |object      |Object to query          |
     * |path  |array string|Path of property to get  |
     * |return|*           |Target value or undefined|
     *
     * ```javascript
     * var obj = {a: {aa: {aaa: 1}}};
     * safeGet(obj, 'a.aa.aaa'); // -> 1
     * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
     * safeGet(obj, 'a.b'); // -> undefined
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef castPath 
     */

    function exports(obj, path)
    {
        path = castPath(path, obj);

        var prop;

        prop = path.shift();
        while (!isUndef(prop))
        {
            obj = obj[prop];
            if (obj == null) return;
            prop = path.shift();
        }

        return obj;
    }

    return exports;
})();

/* ------------------------------ isNum ------------------------------ */

var isNum = _.isNum = (function () {
    /* Check if value is classified as a Number primitive or object.
     *
     * |Name  |Type   |Desc                                 |
     * |------|-------|-------------------------------------|
     * |val   |*      |Value to check                       |
     * |return|boolean|True if value is correctly classified|
     * 
     * ```javascript
     * isNum(5); // -> true
     * isNum(5.1); // -> true
     * isNum({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        return objToStr(val) === '[object Number]';
    }

    return exports;
})();

/* ------------------------------ indent ------------------------------ */
_.indent = (function () {
    /* Indent each line in a string.
     *
     * |Name  |Type  |Desc                |
     * |------|------|--------------------|
     * |str   |string|String to indent    |
     * |[char]|string|Character to prepend|
     * |[len] |number|Indent length       |
     * |return|string|Indented string     |
     *
     * ```javascript
     * indent('foo\nbar', ' ', 4); // -> 'foo\n    bar'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum isUndef repeat 
     */

    var regLineBegin = /^(?!\s*$)/mg;

    function exports(str, char, len)
    {
        if (isNum(char))
        {
            len = char;
            char = ' ';
        }
        if (isUndef(len)) len = 4;
        if (isUndef(char)) char = ' ';

        char = repeat(char, len);

        return str.replace(regLineBegin, char);
    }

    return exports;
})();

/* ------------------------------ isFn ------------------------------ */

var isFn = _.isFn = (function () {
    /* Check if value is a function.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is a function|
     *
     * Generator function is also classified as true.
     *
     * ```javascript
     * isFn(function() {}); // -> true
     * isFn(function*() {}); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        var objStr = objToStr(val);

        return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
    }

    return exports;
})();

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = _.isArrLike = (function () {
    /* Check if value is array-like.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is array like|
     *
     * > Function returns false.
     *
     * ```javascript
     * isArrLike('test'); // -> true
     * isArrLike(document.body.children); // -> true;
     * isArrLike([1, 2, 3]); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum isFn 
     */

    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    function exports(val)
    {
        if (!val) return false;

        var len = val.length;

        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    }

    return exports;
})();

/* ------------------------------ isMiniProgram ------------------------------ */

var isMiniProgram = _.isMiniProgram = (function (exports) {
    /* Check if running in wechat mini program.
     *
     * ```javascript
     * console.log(isMiniProgram); // -> true if running in mini program.
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isFn 
     */ 

    /* eslint-disable no-undef */
    exports = typeof wx !== 'undefined' && isFn(wx.openLocation);

    return exports;
})({});

/* ------------------------------ isBrowser ------------------------------ */

var isBrowser = _.isBrowser = (function (exports) {
    /* Check if running in a browser.
     *
     * ```javascript
     * console.log(isBrowser); // -> true if running in a browser
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    exports = typeof window === 'object' &&
              typeof document === 'object' &&
              document.nodeType === 9;

    return exports;
})({});

/* ------------------------------ root ------------------------------ */

var root = _.root = (function (exports) {
    /* Root object reference, `global` in nodeJs, `window` in browser. */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isBrowser 
     */

    exports = isBrowser ? window : global;

    return exports;
})({});

/* ------------------------------ detectMocha ------------------------------ */

var detectMocha = _.detectMocha = (function () {
    /* Detect if mocha is running.
     *
     * ```javascript
     * detectMocha(); // -> True if mocha is running.
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * root 
     */ 

    function exports() 
    {
        for (var i = 0, len = methods.length; i < len; i++) 
        {
            var method = methods[i];

            if (typeof root[method] !== 'function') return false;
        }

        return true;
    }

    var methods = ['afterEach','after','beforeEach','before','describe','it'];

    return exports;
})();

/* ------------------------------ keys ------------------------------ */

var keys = _.keys = (function (exports) {
    /* Create an array of the own enumerable property names of object.
     *
     * |Name  |Type  |Desc                   |
     * |------|------|-----------------------|
     * |obj   |object|Object to query        |
     * |return|array |Array of property names|
     * 
     * ```javascript
     * keys({a: 1}); // -> ['a']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has detectMocha 
     */

    if (Object.keys && !detectMocha()) 
    {
        exports = Object.keys;
    } else 
    {
        exports = function (obj)
        {
            var ret = [], key;

            for (key in obj)
            {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };
    }

    return exports;
})({});

/* ------------------------------ each ------------------------------ */

var each = _.each = (function () {
    /* Iterate over elements of collection and invokes iteratee for each element.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |object array|Collection to iterate over    |
     * |iteratee|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     *
     * ```javascript
     * each({'a': 1, 'b': 2}, function (val, key) {});
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike keys optimizeCb 
     */

    function exports(obj, iteratee, ctx)
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
    }

    return exports;
})();

/* ------------------------------ createAssigner ------------------------------ */

var createAssigner = _.createAssigner = (function () {
    /* Used to create extend, extendOwn and defaults.
     *
     * |Name    |Type    |Desc                          |
     * |--------|--------|------------------------------|
     * |keysFn  |function|Function to get object keys   |
     * |defaults|boolean |No override when set to true  |
     * |return  |function|Result function, extend...    |
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef each 
     */

    function exports(keysFn, defaults)
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
    }

    return exports;
})();

/* ------------------------------ defaults ------------------------------ */
_.defaults = (function (exports) {
    /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |*src  |object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * createAssigner allKeys 
     */

    exports = createAssigner(allKeys, true);

    return exports;
})({});

/* ------------------------------ extend ------------------------------ */

var extend = _.extend = (function (exports) {
    /* Copy all of the properties in the source objects over to the destination object.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |...src|object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * createAssigner allKeys 
     */

    exports = createAssigner(allKeys);

    return exports;
})({});

/* ------------------------------ values ------------------------------ */

var values = _.values = (function () {
    /* Create an array of the own enumerable property values of object.
     *
     * |Name  |Type  |Desc                    |
     * |------|------|------------------------|
     * |obj   |object|Object to query         |
     * |return|array |Array of property values|
     *
     * ```javascript
     * values({one: 1, two: 2}); // -> [1, 2]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * each 
     */

    function exports(obj)
    {
        var ret = [];

        each(obj, function (val) { ret.push(val); });

        return ret;
    }

    return exports;
})();

/* ------------------------------ contain ------------------------------ */
_.contain = (function () {
    /* Check if the value is present in the list.
     *
     * |Name  |Type        |Desc                                |
     * |------|------------|------------------------------------|
     * |array |array object|Target list                         |
     * |value |*           |Value to check                      |
     * |return|boolean     |True if value is present in the list|
     *
     * ```javascript
     * contain([1, 2, 3], 1); // -> true
     * contain({a: 1, b: 2}, 1); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * idxOf isArrLike values 
     */

    function exports(arr, val)
    {
        if (!isArrLike(arr)) arr = values(arr);

        return idxOf(arr, val) >= 0;
    }

    return exports;
})();

/* ------------------------------ extendOwn ------------------------------ */

var extendOwn = _.extendOwn = (function (exports) {
    /* Like extend, but only copies own properties over to the destination object.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |*src  |object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys createAssigner 
     */

    exports = createAssigner(keys);

    return exports;
})({});

/* ------------------------------ isStr ------------------------------ */

var isStr = _.isStr = (function () {
    /* Check if value is a string primitive.
     *
     * |Name  |Type   |Desc                               |
     * |------|-------|-----------------------------------|
     * |val   |*      |Value to check                     |
     * |return|boolean|True if value is a string primitive|
     *
     * ```javascript
     * isStr('licia'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        return objToStr(val) === '[object String]';
    }

    return exports;
})();

/* ------------------------------ isEmpty ------------------------------ */
_.isEmpty = (function () {
    /* Check if value is an empty object or array.
     *
     * |Name  |Type   |Desc                  |
     * |------|-------|----------------------|
     * |val   |*      |Value to check        |
     * |return|boolean|True if value is empty|
     *
     * ```javascript
     * isEmpty([]); // -> true
     * isEmpty({}); // -> true
     * isEmpty(''); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike isArr isStr isArgs keys 
     */

    function exports(val)
    {
        if (val == null) return true;

        if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val)))
        {
            return val.length === 0;
        }

        return keys(val).length === 0;
    }

    return exports;
})();

/* ------------------------------ isMatch ------------------------------ */

var isMatch = _.isMatch = (function () {
    /* Check if keys and values in src are contained in obj.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |obj   |object |Object to inspect                 |
     * |src   |object |Object of property values to match|
     * |return|boolean|True if object is match           |
     *
     * ```javascript
     * isMatch({a: 1, b: 2}, {a: 1}); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys 
     */

    function exports(obj, src)
    {
        var _keys = keys(src),
            len = _keys.length;

        if (obj == null) return !len;

        obj = Object(obj);

        for (var i = 0; i < len; i++)
        {
            var key = _keys[i];
            if (src[key] !== obj[key] || !(key in obj)) return false;
        }

        return true;
    }

    return exports;
})();

/* ------------------------------ isObj ------------------------------ */

var isObj = _.isObj = (function () {
    /* Check if value is the language type of Object.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is an object|
     *
     * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
     *
     * ```javascript
     * isObj({}); // -> true
     * isObj([]); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val)
    {
        var type = typeof val;

        return !!val && (type === 'function' || type === 'object');
    }

    return exports;
})();

/* ------------------------------ isPlainObj ------------------------------ */
_.isPlainObj = (function () {
    /* Check if value is an object created by Object constructor.
     *
     * |Name  |Type   |Desc                           |
     * |------|-------|-------------------------------|
     * |val   |*      |Value to check                 |
     * |return|boolean|True if value is a plain object|
     *
     * ```javascript
     * isPlainObj({}); // -> true
     * isPlainObj([]); // -> false
     * isPlainObj(function () {}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isObj isArr isFn has 
     */

    function exports(val)
    {
        if (!isObj(val)) return false;

        var ctor = val.constructor;
        if (!isFn(ctor)) return false;
        if (!has(ctor.prototype, 'isPrototypeOf')) return false;

        return !isArr(val) && !isFn(val);
    }

    return exports;
})();

/* ------------------------------ ltrim ------------------------------ */

var ltrim = _.ltrim = (function () {
    /* Remove chars or white-spaces from beginning of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * ltrim(' abc  '); // -> 'abc  '
     * ltrim('_abc_', '_'); // -> 'abc_'
     * ltrim('_abc_', ['a', '_']); // -> 'bc_'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regSpace = /^\s+/;

    function exports(str, chars)
    {
        if (chars == null) return str.replace(regSpace, '');

        var start = 0,
            len = str.length,
            charLen = chars.length,
            found = true,
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

        return start >= len ? '' : str.substr(start, len);
    }

    return exports;
})();

/* ------------------------------ matcher ------------------------------ */

var matcher = _.matcher = (function () {
    /* Return a predicate function that checks if attrs are contained in an object.
     *
     * |Name  |Type    |Desc                              |
     * |------|--------|----------------------------------|
     * |attrs |object  |Object of property values to match|
     * |return|function|New predicate function            |
     *
     * ```javascript
     * var objects = [
     *     {a: 1, b: 2, c: 3 },
     *     {a: 4, b: 5, c: 6 }
     * ];
     * filter(objects, matcher({a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6 }]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * extendOwn isMatch 
     */

    function exports(attrs)
    {
        attrs = extendOwn({}, attrs);

        return function (obj)
        {
            return isMatch(obj, attrs);
        };
    }

    return exports;
})();

/* ------------------------------ safeCb ------------------------------ */

var safeCb = _.safeCb = (function (exports) {
    /* Create callback based on input value.
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isFn isObj optimizeCb matcher identity 
     */

    exports = function (val, ctx, argCount)
    {
        if (val == null) return identity;

        if (isFn(val)) return optimizeCb(val, ctx, argCount);

        if (isObj(val)) return matcher(val);

        return function (key)
        {
            return function (obj)
            {
                return obj == null ? undefined : obj[key];
            };
        };
    };

    return exports;
})({});

/* ------------------------------ filter ------------------------------ */

var filter = _.filter = (function () {
    /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
     *
     * |Name     |Type    |Desc                                   |
     * |---------|--------|---------------------------------------|
     * |obj      |array   |Collection to iterate over             |
     * |predicate|function|Function invoked per iteration         |
     * |[ctx]    |*       |Predicate context                      |
     * |return   |array   |Array of all values that pass predicate|
     *
     * ```javascript
     * filter([1, 2, 3, 4, 5], function (val)
     * {
     *     return val % 2 === 0;
     * }); // -> [2, 4]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb each 
     */

    function exports(obj, predicate, ctx)
    {
        var ret = [];

        predicate = safeCb(predicate, ctx);

        each(obj, function (val, idx, list)
        {
            if (predicate(val, idx, list)) ret.push(val);
        });

        return ret;
    }

    return exports;
})();

/* ------------------------------ map ------------------------------ */

var map = _.map = (function () {
    /* Create an array of values by running each element in collection through iteratee.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |array object|Collection to iterate over    |
     * |iteratee|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     * |return  |array       |New mapped array              |
     *
     * ```javascript
     * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb keys isArrLike 
     */

    function exports(obj, iteratee, ctx)
    {
        iteratee = safeCb(iteratee, ctx);

        var _keys = !isArrLike(obj) && keys(obj),
            len = (_keys || obj).length,
            results = Array(len);

        for (var i = 0; i < len; i++)
        {
            var curKey = _keys ? _keys[i] : i;
            results[i] = iteratee(obj[curKey], curKey, obj);
        }

        return results;
    }

    return exports;
})();

/* ------------------------------ toArr ------------------------------ */

var toArr = _.toArr = (function () {
    /* Convert value to an array.
     *
     * |Name  |Type |Desc            |
     * |------|-----|----------------|
     * |val   |*    |Value to convert|
     * |return|array|Converted array |
     *
     * ```javascript
     * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
     * toArr('abc'); // -> ['abc']
     * toArr(1); // -> [1]
     * toArr(null); // -> []
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike map isArr isStr 
     */

    function exports(val)
    {
        if (!val) return [];

        if (isArr(val)) return val;

        if (isArrLike(val) && !isStr(val)) return map(val);

        return [val];
    }

    return exports;
})();

/* ------------------------------ Class ------------------------------ */
_.Class = (function () {
    /* Create JavaScript class.
     *
     * |Name     |Type    |Desc                             |
     * |---------|--------|---------------------------------|
     * |methods  |object  |Public methods                   |
     * |[statics]|object  |Static methods                   |
     * |return   |function|Function used to create instances|
     *
     * ```javascript
     * var People = Class({
     *     initialize: function People(name, age)
     *     {
     *         this.name = name;
     *         this.age = age;
     *     },
     *     introduce: function ()
     *     {
     *         return 'I am ' + this.name + ', ' + this.age + ' years old.';
     *     }
     * });
     *
     * var Student = People.extend({
     *     initialize: function Student(name, age, school)
     *     {
     *         this.callSuper(People, 'initialize', arguments);
     *
     *         this.school = school;
     *     },
     *     introduce: function ()
     *     {
     *         return this.callSuper(People, 'introduce') + '\n I study at ' + this.school + '.';
     *     }
     * }, {
     *     is: function (obj)
     *     {
     *         return obj instanceof Student;
     *     }
     * });
     *
     * var a = new Student('allen', 17, 'Hogwarts');
     * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
     * Student.is(a); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * extend toArr inherits has safeGet isMiniProgram 
     */

    function exports(methods, statics)
    {
        return Base.extend(methods, statics);
    }

    function makeClass(parent, methods, statics)
    {
        statics = statics || {};
        var className = methods.className || safeGet(methods, 'initialize.name') || '';
        delete methods.className;

        var ctor;
        if (isMiniProgram) 
        {
            ctor = function () 
            {
                var args = toArr(arguments);
                return this.initialize ? this.initialize.apply(this, args) || this : this;
            };
        } else 
        {
            ctor = new Function('toArr', 'return function ' + className + '()' + 
            '{' +
                'var args = toArr(arguments);' +
                'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
            '};')(toArr);
        }

        inherits(ctor, parent);
        ctor.prototype.constructor = ctor;

        ctor.extend = function (methods, statics)
        {
            return makeClass(ctor, methods, statics);
        };
        ctor.inherits = function (Class)
        {
            inherits(ctor, Class);
        };
        ctor.methods = function (methods)
        {
            extend(ctor.prototype, methods);
            return ctor;
        };
        ctor.statics = function (statics)
        {
            extend(ctor, statics);
            return ctor;
        };

        ctor.methods(methods).statics(statics);

        return ctor;
    }

    var Base = exports.Base = makeClass(Object, {
        className: 'Base',
        callSuper: function (parent, name, args)
        {
            var superMethod = parent.prototype[name];

            return superMethod.apply(this, args);
        },
        toString: function ()
        {
            return this.constructor.name;
        }
    });

    return exports;
})();

/* ------------------------------ noop ------------------------------ */
_.noop = (function () {
    /* A no-operation function.
     *
     * ```javascript
     * noop(); // Does nothing
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports() {}

    return exports;
})();

/* ------------------------------ now ------------------------------ */
_.now = (function (exports) {
    /* Gets the number of milliseconds that have elapsed since the Unix epoch.
     *
     * ```javascript
     * now(); // -> 1468826678701
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    exports = Date.now || function ()
    {
        return new Date().getTime();
    };

    return exports;
})({});

/* ------------------------------ toStr ------------------------------ */

var toStr = _.toStr = (function () {
    /* Convert value to a string.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |val   |*     |Value to convert|
     * |return|string|Resulted string |
     *
     * ```javascript
     * toStr(null); // -> ''
     * toStr(1); // -> '1'
     * toStr(false); // -> 'false'
     * toStr([1, 2, 3]); // -> '1,2,3'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val)
    {
        return val == null ? '' : val.toString();
    }

    return exports;
})();

/* ------------------------------ rpad ------------------------------ */
_.rpad = (function () {
    /* Pad string on the right side if it's shorter than length.
     *
     * |Name  |Type  |Desc                  |
     * |------|------|----------------------|
     * |str   |string|String to pad         |
     * |len   |number|Padding length        |
     * |chars |string|String used as padding|
     * |return|string|Resulted string       |
     *
     * ```javascript
     * rpad('a', 5); // -> 'a    '
     * rpad('a', 5, '-'); // -> 'a----'
     * rpad('abc', 3, '-'); // -> 'abc'
     * rpad('abc', 5, 'ab'); // -> 'abcab'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * repeat toStr 
     */

    function exports(str, len, chars)
    {
        str = toStr(str);

        var strLen = str.length;

        chars = chars || ' ';

        if (strLen < len) str = (str + repeat(chars, len - strLen)).slice(0, len);

        return str;
    }

    return exports;
})();

/* ------------------------------ rtrim ------------------------------ */

var rtrim = _.rtrim = (function () {
    /* Remove chars or white-spaces from end of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * rtrim(' abc  '); // -> ' abc'
     * rtrim('_abc_', '_'); // -> '_abc'
     * rtrim('_abc_', ['c', '_']); // -> '_ab'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regSpace = /\s+$/;

    function exports(str, chars)
    {
        if (chars == null) return str.replace(regSpace, '');

        var end = str.length - 1,
            charLen = chars.length,
            found = true,
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
    }

    return exports;
})();

/* ------------------------------ trim ------------------------------ */

var trim = _.trim = (function () {
    /* Remove chars or white-spaces from beginning end of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * trim(' abc  '); // -> 'abc'
     * trim('_abc_', '_'); // -> 'abc'
     * trim('_abc_', ['a', 'c', '_']); // -> 'b'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * ltrim rtrim 
     */

    var regSpace = /^\s+|\s+$/g;

    function exports(str, chars)
    {
        if (chars == null) return str.replace(regSpace, '');

        return ltrim(rtrim(str, chars), chars);
    }

    return exports;
})();

/* ------------------------------ extractBlockCmts ------------------------------ */
_.extractBlockCmts = (function () {
    /* Extract block comments from source code.
     *
     * |Name  |Type  |Desc             |
     * |------|------|-----------------|
     * |str   |string|String to extract|
     * |return|array |Block comments   |
     *
     * ```javascript
     * extractBlockCmts('\/*licia*\/'); // -> ['licia']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * map trim 
     */

    var regBlockCmt = /(\/\*[\s\S]*?\*\/)/mg;

    function exports(str)
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
    }

    return exports;
})();

/* ------------------------------ some ------------------------------ */
_.some = (function () {
    /* Check if predicate return truthy for any element.
     *
     * |Name     |Type        |Desc                                          |
     * |---------|------------|----------------------------------------------|
     * |obj      |array object|Collection to iterate over                    |
     * |predicate|function    |Function to invoked per iteration             |
     * |ctx      |*           |Predicate context                             |
     * |return   |boolean     |True if any element passes the predicate check|
     *
     * ```javascript
     * some([2, 5], function (val)
     * {
     *     return val % 2 === 0;
     * }); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb isArrLike keys 
     */

    function exports(obj, predicate, ctx)
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
    }

    return exports;
})();

/* ------------------------------ startWith ------------------------------ */
_.startWith = (function () {
    /* Check if string starts with the given target string.
     *
     * |Name  |Type   |Desc                             |
     * |------|-------|---------------------------------|
     * |str   |string |String to search                 |
     * |prefix|string |String prefix                    |
     * |return|boolean|True if string starts with prefix|
     *
     * ```javascript
     * startWith('ab', 'a'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str, prefix)
    {
        return str.indexOf(prefix) === 0;
    }

    return exports;
})();

/* ------------------------------ stripCmt ------------------------------ */
_.stripCmt = (function () {
    /* Strip comments from source code.
     *
     * |Name  |Type  |Desc                 |
     * |------|------|---------------------|
     * |str   |string|Source code          |
     * |return|string|Code without comments|
     *
     * ```javascript
     * stripCmts('// comment \n var a = 5; /* comment2\n * comment3\n *\/'); // -> ' var a = 5; '
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str)
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
                if (str[i] === '\'' && str[i-1] !== '\\') mode.singleQuote = false;
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
            mode.singleQuote = str[i] === '\'';

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
    }

    return exports;
})();

/* ------------------------------ stripColor ------------------------------ */
_.stripColor = (function () {
    /* Strip ansi color codes from a string.
     *
     * |Name  |Type  |Desc           |
     * |------|------|---------------|
     * |str   |string|String to strip|
     * |return|string|Resulted string|
     *
     * ```javascript
     * stripColor('\u001b[31mred\u001b[39m'); // -> 'red'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* eslint-disable no-control-regex */
    var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

    function exports(str)
    {
        return str.replace(regColor, '');
    }

    return exports;
})();

/* ------------------------------ topoSort ------------------------------ */
_.topoSort = (function () {
    /* Topological sorting algorithm.
     *
     * |Name  |Type |Desc        |
     * |------|-----|------------|
     * |edges |array|Dependencies|
     * |return|array|Sorted order|
     *
     * ```javascript
     * topoSort([[1, 2], [1, 3], [3, 2]]); // -> [1, 3, 2]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(edges)
    {
        return sort(uniqueNodes(edges), edges);
    }

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

            var outgoing = edges.filter(function(edge) { return edge[0] === node; });

            /* eslint-disable no-cond-assign */
            if (i = outgoing.length)
            {
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
})();

/* ------------------------------ unique ------------------------------ */
_.unique = (function () {
    /* Create duplicate-free version of an array.
     *
     * |Name     |Type    |Desc                         |
     * |---------|--------|-----------------------------|
     * |arr      |array   |Array to inspect             |
     * |[compare]|function|Function for comparing values|
     * |return   |array   |New duplicate free array     |
     *
     * ```javascript
     * unique([1, 2, 3, 1]); // -> [1, 2, 3]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * filter 
     */

    function exports(arr, compare)
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
    }

    function isEqual(a, b)
    {
        return a === b;
    }

    return exports;
})();

module.exports = _;