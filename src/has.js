'objProto';

var hasOwnProperty = objProto.hasOwnProperty;

exports = function (obj, key)
{
    return obj !== null && hasOwnProperty.call(obj, key);
};