function strRepeat(str, qty)
{
    var ret = '';

    if (qty < 1) return ret;

    while (qty > 0)
    {
        if (qty & 1) ret += str;
        qty >>= 1;
        str += str;
    }

    return ret;
}

exports = function (str, len, padStr, type)
{
    var padLen = 0;

    padStr = padStr || ' ';
    padStr = padStr.charAt(0);

    padLen = len - str.length;

    switch (type)
    {
        case 'r': return str + strRepeat(padStr, padLen);
        case 'l': return strRepeat(padStr, padLen) + str;
        default: return strRepeat(padStr, Math.ceil(padLen / 2)) +
                        str +
                        strRepeat(padStr, Math.floor(padLen /2));
    }
};