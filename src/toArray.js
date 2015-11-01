'isArray slice isString isArrLike map identity values';

var regReStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

toArray = function (obj)
{
    if (!obj) return [];

    if (isArray(obj)) return slice(obj);

    if (isString(obj)) return obj ? obj.match(regReStrSymbol) : [];

    if (isArrLike(obj)) return map(obj, identity);

    return values(obj);
};