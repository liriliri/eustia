'toString';

exports = function (val)
{
    return toString.call(val) === '[object Date]';
};