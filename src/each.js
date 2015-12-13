// @TODO

'isArrLike keys _optimizeCb';

each = function (obj, iteratee, ctx)
{
    iteratee = _optimizeCb(iteratee, ctx);

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
};