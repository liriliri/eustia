'keys each';

invert = function (obj)
{
    var ret = {};

    each(obj, function (val, key) { ret[val] = key });

    return ret;
};