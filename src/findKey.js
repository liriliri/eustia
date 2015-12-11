// @TODO

'cb keys';

findKey = function (obj, predicate, ctx)
{
    predicate = cb(predicate, ctx);

    var _keys = keys(obj), key;

    for (var i = 0, len = _keys.length; i < len; i++)
    {
        key = _keys[i];
        if (predicate(obj[key], key, obj)) return key;
    }
};