exports = function (obj)
{
    var type = typeof obj;

    return type === 'function' || type === 'object' && !!obj;
};