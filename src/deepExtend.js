'isPlainObject each deepClone';

exports = function (obj)
{
    var i   = 0,
        ret = obj,
        len = arguments.length;

    while (++i < len)
    {
        obj = arguments[i];

        if (isPlainObject(ret) && isPlainObject(obj))
        {
            each(obj, function (val, key)
            {
                ret[key] = exports(ret[key], obj[key]);
            });
        } else
        {
            ret = deepClone(obj);
        }
    }

    return ret;
};