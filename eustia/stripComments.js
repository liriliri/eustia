var regStripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

exports = function (str)
{
    return str.replace(regStripComments, '');
};