// TODO

include('isObj isArr');

isPlainObj = function (obj)
{
    return isObj(obj) && !isArr(obj);
};