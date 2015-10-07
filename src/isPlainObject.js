'isObject isArray';

exports = function (obj)
{
    return isObject(obj) && !isArray(obj);
};