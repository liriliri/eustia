_.isRegExp = function (val)
{
    return _.toString.call(val) === '[object RegExp]';
};