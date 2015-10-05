'toString';

exports = function (val)
{
    return val === true  ||
           val === false ||
           toString.call(val) === '[object Boolean]';
};