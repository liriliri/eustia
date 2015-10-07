'isObject';

exports = function (obj)
{
    if (!isObject(obj)) return [];

    var keys = [];

    for (var key in obj) keys.push(key);

    return keys;
};