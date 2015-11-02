'isObj';

allKeys = function (obj)
{
    if (!isObj(obj)) return [];

    var keys = [];

    for (var key in obj) keys.push(key);

    return keys;
};