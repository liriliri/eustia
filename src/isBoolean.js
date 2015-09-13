_.isBoolean = function (val)
{
    return val === true  ||
           val === false ||
           _.toString.call(val) === '[object Boolean]';
};