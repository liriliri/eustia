'getLen isNum';

var MAX_ARR_IDX = Math.pow(2, 53) - 1;

isArrLike = function (value)
{
    var len = getLen(value);

    return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
};