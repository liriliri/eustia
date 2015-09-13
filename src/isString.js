_.isString = function (val)
{
    return _.toString.call(val) === '[object String]';
};