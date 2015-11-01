'getLen isNumber';

var MAX_ARR_IDX = Math.pow(2, 53) - 1;

var isArrLike = function (collection)
{
    var len = getLen(collection);

    return isNumber(len) && len >= 0 && len <= MAX_ARR_IDX;
};