'keys';

values = function (obj)
{
    var _keys = keys(obj),
        len   = _keys.length,
        ret   = Array(len);

    for (var i = 0; i < len; i++) ret[i] = obj[_keys[i]];

    return ret;
};