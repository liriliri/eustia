'_arrProto';

exports = function (arr, start, end)
{
    return _arrProto.slice.call(arr, start, end);
};