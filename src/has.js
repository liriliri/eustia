'_objProto';

var hasOwnProperty = _objProto.hasOwnProperty;

exports = function (obj, key)
{
    return obj != null && hasOwnProperty.call(obj, key);
};