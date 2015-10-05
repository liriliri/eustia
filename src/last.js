exports = function (arr)
{
    var len = arr ? arr.length : 0;

    return len ? arr[len - 1] : undefined;
};