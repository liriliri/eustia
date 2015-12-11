// @TODO

'isPlainObj each deepClone';

deepExtend = function (obj)
{
    var i   = 0,
        ret = obj,
        len = arguments.length;

    while (++i < len)
    {
        obj = arguments[i];

        if (isPlainObj(ret) && isPlainObj(obj))
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