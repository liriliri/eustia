// @TODO

'keys isObj isFn isArr each';

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

deepClone = function (obj)
{
    if (isArr(obj))
    {
        return obj.map(function (val)
        {
            return exports(val);
        });
    }

    if (isObj(obj) && !isFn(obj))
    {
        return mapObject(obj, function (key, val)
        {
            return [key, exports(val)];
        });
    }

    return obj;
};