'identity isFunction isObject optimizeCb matcher property';

exports = function (val, ctx, argCount)
{
    if (val === null) return identity;

    if (isFunction(val)) return optimizeCb(val, ctx, argCount);

    if (isObject(val)) return matcher(val);

    return property;
};