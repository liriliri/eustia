'Class isArr each';

function removeParameter(url, parameter)
{
    var urlparts= url.split('?');

    if (urlparts.length>=2)
    {
        var urlBase=urlparts.shift(); //get first part, and remove from array
        var queryString=urlparts.join("?"); //join it back up

        var prefix = encodeURIComponent(parameter)+'=';
        var pars = queryString.split(/[&;]/g);
        for (var i= pars.length; i-->0;)               //reverse iteration as may be destructive
            if (pars[i].lastIndexOf(prefix, 0)!==-1)   //idiom for string.startsWith
                pars.splice(i, 1);
        url = urlBase+'?'+pars.join('&');
    }
    return url;
}

function updateQueryStringParameter(uri, key, value)
{
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

Uri = Class({
    className: 'Uri',
    initialize: function (url)
    {
        this._url = url || window.location.href;
    },
    rmQuery: function (names)
    {
        if (!isArr(names)) names = [names];

        each(names, function (name)
        {
            this._url = removeParameter(this._url, name);
        }, this);

        return this;
    },
    query: function (key, value)
    {
        this._url = updateQueryStringParameter(this._url, key, value);

        return this;
    },
    toString: function ()
    {
        return this._url;
    }
});
