'cb each';

exports = function (obj, predicate, ctx)
{
    var ret = [];

    predicate = cb(predicate, ctx);

    each(obj, function (val, idx, list)
    {
        if (predicate(val, idx, list)) ret.push(val);
    });

    return ret;
};