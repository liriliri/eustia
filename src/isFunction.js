_.isFunction = function (val)
{
    return _.toString.call(val) === '[object Function]';
};