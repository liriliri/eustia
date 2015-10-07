var regEscape = /([.*+?^=!:${}()|[\]\/\\])/g;

exports = function (str)
{
    return str.replace(regEscape, '\\$1');
};