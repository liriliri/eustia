var hasOwnProp = Object.prototype.hasOwnProperty;

has = function (obj, key)
{
    return obj != null && hasOwnProp.call(obj, key);
};