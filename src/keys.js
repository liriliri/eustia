'isObject has';

var nativeKeys = Object.keys;

exports = function (obj)
{
    if (!isObject(obj)) return [];

    if (nativeKeys) return nativeKeys(obj);

    var keys = [];

    for (var key in obj)
    {
        if (has(obj, key)) keys.push(key);
    }

    return keys;
};