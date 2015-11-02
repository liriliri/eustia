'isObj has';

var nativeKeys = Object.keys;

keys = function (obj)
{
    if (!isObj(obj)) return [];

    if (nativeKeys) return nativeKeys(obj);

    var keys = [];

    for (var key in obj)
    {
        if (has(obj, key)) keys.push(key);
    }

    return keys;
};