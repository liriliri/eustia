'isArrLike keys optimizeCb';

exports = function (obj, iteratee, ctx)
{
    iteratee = optimizeCb(iteratee, ctx);

    var i, len;

    if (isArrLike(obj))
    {
        for (i = 0, len = obj.length; i < len; i++)
        {
            iteratee(obj[i], i, obj);
        }
    } else
    {
        keys = keys(obj);
        for (i = 0, len = keys.length; i < len; i++)
        {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }

    return obj;
};