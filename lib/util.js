// Built by eustia.
module.exports = (function ()
{
    var _ = {};

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function ()
    {
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

    var has = _.has = (function ()
    {
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

        var hasOwnProp = Object.prototype.hasOwnProperty;

        function exports(obj, key)
        {
            return hasOwnProp.call(obj, key);
        }

        return exports;
    })();

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function ()
    {
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

        function exports(obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        }

        return exports;
    })();

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function ()
    {
        /* Get the index at which the first occurrence of value.
         *
         * |Name       |Type  |Desc                |
         * |-----------|------|--------------------|
         * |arr        |array |Array to search     |
         * |val        |*     |Value to search for |
         * |[fromIdx=0]|number|Index to search from|
         *
         * ```javascript
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         * ```
         */

        function exports(arr, val, fromIdx)
        {
            return Array.prototype.indexOf.call(arr, val, fromIdx);
        }

        return exports;
    })();

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function ()
    {
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

        function exports(val)
        {
            return val === void 0;
        }

        return exports;
    })();

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports)
    {
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

        /* dependencies
         * has 
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

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function ()
    {
        /* Used for function context binding.
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
                }
            }

            return function ()
            {
                return fn.apply(ctx, arguments);
            };
        }

        return exports;
    })();

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function ()
    {
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

        function exports(val)
        {
            return val;
        }

        return exports;
    })();

    /* ------------------------------ repeat ------------------------------ */

    var repeat = _.repeat = (function (exports)
    {
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

    var objToStr = _.objToStr = (function ()
    {
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

        var ObjToStr = Object.prototype.toString;

        function exports(val)
        {
            return ObjToStr.call(val);
        }

        return exports;
    })();

    /* ------------------------------ isArgs ------------------------------ */

    var isArgs = _.isArgs = (function ()
    {
        /* Check if value is classified as an arguments object.
         *
         * |Name  |Type   |Desc                                |
         * |------|-------|------------------------------------|
         * |value |*      |Value to check                      |
         * |return|boolean|True if value is an arguments object|
         *
         * ```javascript
         * (function () {
         *     isArgs(arguments); // -> true
         * })();
         * ```
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

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function ()
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |value |*      |Value to check                       |
         * |return|boolean|True if value is correctly classified|
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

    _.indent = (function ()
    {
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

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports)
    {
        /* Check if value is an `Array` object.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |val   |*      |The value to check                |
         * |return|boolean|True if value is an `Array` object|
         *
         * ```javascript
         * isArr([]); // -> true
         * isArr({}); // -> false
         * ```
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

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function ()
    {
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

    var isArrLike = _.isArrLike = (function ()
    {
        /* Check if value is array-like.
         *
         * |Name  |Type   |Desc                       |
         * |------|-------|---------------------------|
         * |value |*      |Value to check             |
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

        /* dependencies
         * isNum has isFn 
         */

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        function exports(val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
        }

        return exports;
    })();

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function ()
    {
        /* Iterates over elements of collection and invokes iteratee for each element.
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

    var createAssigner = _.createAssigner = (function ()
    {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Type    |Desc                          |
         * |--------|--------|------------------------------|
         * |keysFn  |function|Function to get object keys   |
         * |defaults|boolean |No override when set to true  |
         * |return  |function|Result function, extend...    |
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

    _.defaults = (function (exports)
    {
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

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports)
    {
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

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports)
    {
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

        /* dependencies
         * keys createAssigner 
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function ()
    {
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

        /* dependencies
         * each 
         */

        function exports(obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        }

        return exports;
    })();

    /* ------------------------------ contain ------------------------------ */

    _.contain = (function ()
    {
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

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function ()
    {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |val   |*      |Value to check                     |
         * |return|boolean|True if value is a string primitive|
         *
         * ```javascript
         * isStr('eris'); // -> true
         * ```
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

    _.isEmpty = (function ()
    {
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

    /* ------------------------------ safeGet ------------------------------ */

    var safeGet = _.safeGet = (function ()
    {
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

        /* dependencies
         * isStr isUndef 
         */

        function exports(obj, path)
        {
            if (isStr(path)) path = path.split('.');

            var prop;

            /* eslint-disable no-cond-assign */
            while (prop = path.shift())
            {
                obj = obj[prop];
                if (isUndef(obj)) return;
            }

            return obj;
        }

        return exports;
    })();

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function ()
    {
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

    var isObj = _.isObj = (function ()
    {
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

        function exports(val)
        {
            var type = typeof val;

            return !!val && (type === 'function' || type === 'object');
        }

        return exports;
    })();

    /* ------------------------------ isPlainObj ------------------------------ */

    _.isPlainObj = (function ()
    {
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

        /* dependencies
         * isObj isArr isFn 
         */

        function exports(val)
        {
            return isObj(val) && !isArr(val) && !isFn(val);
        }

        return exports;
    })();

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function ()
    {
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

    var matcher = _.matcher = (function ()
    {
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

    var safeCb = _.safeCb = (function (exports)
    {
        /* Create callback based on input value.
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
                }
            };
        };

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function ()
    {
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

    var map = _.map = (function ()
    {
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

    var toArr = _.toArr = (function ()
    {
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

    _.Class = (function ()
    {
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
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.'.
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
         *         return this.callSuper(People, 'introduce') + '\n I study at ' + this.school + '.'.
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

        /* dependencies
         * extend toArr inherits has safeGet 
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

            var ctor = new Function('toArr', 'return function ' + className + '()' + 
            '{' +
                'var args = toArr(arguments);' +
                'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
            '};')(toArr);

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

    _.noop = (function ()
    {
        /* A no-operation function.
         *
         * ```javascript
         * noop(); // Does nothing
         * ```
         */

        function exports() {}

        return exports;
    })();

    /* ------------------------------ now ------------------------------ */

    _.now = (function (exports)
    {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         *
         * ```javascript
         * now(); // -> 1468826678701
         * ```
         */

        exports = Date.now || function ()
        {
            return new Date().getTime();
        };

        return exports;
    })({});

    /* ------------------------------ rpad ------------------------------ */

    _.rpad = (function ()
    {
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

        /* dependencies
         * repeat 
         */

        function exports(str, len, chars)
        {
            var strLen = str.length;

            chars = chars || ' ';

            if (strLen < len) str = (str + repeat(chars, len - strLen)).slice(0, len);

            return str;
        }

        return exports;
    })();

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function ()
    {
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

    var trim = _.trim = (function ()
    {
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

    _.extractBlockCmts = (function ()
    {
        /* Extract block comments from source code.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to extract|
         * |return|array |Block comments   |
         *
         * ```javascript
         * extractBlockCmts('\/*eris*\/'); // -> ['eris']
         * ```
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

    _.some = (function ()
    {
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

    _.startWith = (function ()
    {
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

        function exports(str, prefix)
        {
            return str.indexOf(prefix) === 0;
        }

        return exports;
    })();

    /* ------------------------------ stripCmt ------------------------------ */

    _.stripCmt = (function ()
    {
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

    _.stripColor = (function ()
    {
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

        /* eslint-disable no-control-regex */
        var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

        function exports(str)
        {
            return str.replace(regColor, '');
        }

        return exports;
    })();

    /* ------------------------------ topoSort ------------------------------ */

    _.topoSort = (function ()
    {
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

                var outgoing = edges.filter(function(edge) { return edge[0] === node });

                /* eslint-disable no-cond-assign */
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

        return exports;
    })();

    /* ------------------------------ unique ------------------------------ */

    _.unique = (function ()
    {
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

    return _;
})();