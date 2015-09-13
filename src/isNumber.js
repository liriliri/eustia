_.isNumber = function (val)
{
    return _.toString.call(val) === '[object val]';
};