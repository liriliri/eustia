'arrProto';

exports = function (arr, start, end)
{
    return arrProto.slice.call(arr, start, end);
};