'getLen isNum';

var MAX_ARR_IDX = Math.pow(2, 53) - 1;

var isArrLike = function (collection)
{
    var len = getLen(collection);

    return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
};