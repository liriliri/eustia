_.('identity isFn isObj _optimizeCb matcher');

_cb = function (val, ctx, argCount)
{
    if (val == null) return identity;

    if (isFn(val)) return _optimizeCb(val, ctx, argCount);

    if (isObj(val)) return matcher(val);

    return function (key)
    {
        return function (obj)
        {
            return obj == null ? undefined : obj[key];
        }
    };
};