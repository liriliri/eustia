'isNum has';

var MAX_ARR_IDX = Math.pow(2, 53) - 1;

isArrLike = function (val)
{
    var len;

    if (has(val, 'length')) len = value.length;

    return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
};