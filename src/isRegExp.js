// TODO

include('objToStr');

isRegExp = function (value)
{
    return objToStr(value) === '[object RegExp]';
};