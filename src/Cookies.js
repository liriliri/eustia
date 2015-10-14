'extend isNumber escape undefined';

var defOpts = { path: '/' };

var Cookies = function (key, val, options)
{
    if (arguments.length > 1)
    {
        options = extend(defOpts, options);

        if (isNumber(options.expires))
        {
            var expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
            options.expires = expires;
        }

        val = encodeURIComponent(String(val));
        key = encodeURIComponent(key);

        document.cookie = [
            key, '=', val,
            options.expires && '; expires=' + options.expires.toUTCString(),
            options.path    && '; path=' + options.path,
            options.domain  && '; domain=' + options.domain,
            options.secure ? '; secure' : ''
        ].join('');

        return;
    }

    var cookies = document.cookie ? document.cookie.split('; ') : [],
        result  = key ? undefined : {};

    for (var i = 0, len = cookies.length; i < len; i++)
    {
        var cookie = cookies[i],
            parts  = cookie.split('='),
            name   = decodeURIComponent(parts.shift());

        cookie = parts.join('=');
        cookie = decodeURIComponent(cookie);

        if (key === name)
        {
            result = cookie;
            break;
        }

        if (!key) result[name] = cookie;
    }

    return result;
};

exports = {
    get: Cookies,
    set: Cookies,
    remove: function (key, options)
    {
        Cookies(key, '', extend(options, {
            expires: -1
        }));
    }
};