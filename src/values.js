'keys';

exports = function (obj)
{
    var _keys = keys(obj),
        len   = _keys.length,
        ret   = Array(len);

    for (var i = 0; i < len; i++) values[i] = obj[_keys[i]];

    return ret;
};