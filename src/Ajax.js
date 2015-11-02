'noop extend';

var defOpts = {
    type    : 'GET',
    success : noop,
    error   : noop,
    complete: noop,
    xhr     : function () { return new window.XMLHttpRequest() },
    timeout : 0
};

Ajax = function (options)
{
    options = extend({}, defOpts, options);


};

Ajax.get = function ()
{

};

Ajax.post = function ()
{

};