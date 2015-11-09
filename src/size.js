'isArrLike keys';

size = function (obj)
{
    return isArrLike(obj) ? obj.length : keys(obj).length;
};