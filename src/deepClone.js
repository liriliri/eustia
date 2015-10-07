'keys isObject isFunction isArray each';

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

exports = function (obj)
{
    if (isArray(obj))
    {
        return obj.map(function (val)
        {
            return exports(val);
        });
    }

    if (isObject(obj) && !isFunction(obj))
    {
        return mapObject(obj, function (key, val)
        {
            return [key, exports(val)];
        });
    }

    return obj;
};