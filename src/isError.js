_.isError = function (val)
{
    return _.toString.call(val) === '[object Error]';
};