/* module
 * Cookies: Simple api for handling browser cookies.
 */

'extend isNumber undefined';

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

        return exports;
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
    /* member
     * Cookies.get: Read cookie.
     * key(string): The cookie name.
     * return(string): Returns cookie value if exists, eles undefined.
     */
    get: Cookies,
    /* member
     * Cookies.set: Set cookie.
     * key(string): The cookie name.
     * val(string): The cookie value.
     * options(Object): Options.
     */
    set: Cookies,
    remove: function (key, options)
    {
        options = options || {};
        options.expires = -1;
        return Cookies(key, '', options);
    }
};