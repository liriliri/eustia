// @TODO

_('isArr slice isStr isArrLike map identity values');

var regReStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

toArr = function (obj)
{
    if (!obj) return [];

    if (isArr(obj)) return slice(obj);

    if (isStr(obj)) return obj ? obj.match(regReStrSymbol) : [];

    if (isArrLike(obj)) return map(obj, identity);

    return values(obj);
};