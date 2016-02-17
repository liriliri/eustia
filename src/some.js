// TODO

include('_cb isArrLike keys');

some = function (obj, predicate, ctx)
{
    predicate = _cb(predicate, ctx);

    var _keys = !isArrLike(obj) && keys(obj),
        len   = (_keys || obj).length;

    for (var i = 0; i < len; i++)
    {
        var key = _keys ? _keys[i] : i;
        if (predicate(obj[key], key, obj)) return true;
    }

    return false;
};