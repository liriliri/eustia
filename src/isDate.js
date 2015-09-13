_.isDate = function (val)
{
    return _.toString.call(val) === '[object Date]';
};