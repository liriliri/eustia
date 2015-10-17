'noop extend';

var defOpts = {
    type    : 'GET',
    success : noop,
    error   : noop,
    complete: noop,
    xhr     : function () { return new window.XMLHttpRequest() },
    timeout : 0
};

exports = function (options)
{
    options = extend({}, defOpts, options);


};

exports.get = function ()
{

};

exports.post = function ()
{

};