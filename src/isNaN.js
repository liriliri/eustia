'isNumber';

exports = function (obj)
{
    return isNumber(obj) && isNaN(obj);
};