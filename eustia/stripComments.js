var regStripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

stripComments = function (str)
{
    return str.replace(regStripComments, '');
};