'identity isFn isObj optimizeCb matcher';

cb = function (val, ctx, argCount)
{
    if (val == null) return identity;

    if (isFn(val)) return optimizeCb(val, ctx, argCount);

    if (isObj(val)) return matcher(val);

    return function (key)
    {
        return function (obj)
        {
            return obj == null ? undefined : obj[key];
        }
    };
};