'undefined';

exports = function (key)
{
    return function (obj)
    {
        return obj === null ? undefined : obj[key];
    }
};