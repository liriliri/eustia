// @TODO

_('indexOf isArrLike values');

contains = function (arr, val)
{
    if (!isArrLike(arr)) arr = values(arr);

    return indexOf(arr, val) >= 0;
};