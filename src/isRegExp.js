// @TODO

_('_toStr');

isRegExp = function (value)
{
    return _toStr.call(value) === '[object RegExp]';
};