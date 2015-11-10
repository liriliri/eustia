'noop defaults';

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
    options = defaults(options, defOpts);


};

Ajax.get = function ()
{

};

Ajax.post = function ()
{

};