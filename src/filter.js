// @TODO

'_cb each';

filter = function (obj, predicate, ctx)
{
    var ret = [];

    predicate = _cb(predicate, ctx);

    each(obj, function (val, idx, list)
    {
        if (predicate(val, idx, list)) ret.push(val);
    });

    return ret;
};