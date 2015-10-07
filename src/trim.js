'strProto escapeRegExp';

var nativeTrim      = strProto.trim,
    nativeTrimLeft  = strProto.trimLeft,
    nativeTrimRight = strProto.trimRight;

exports = function (str, chars, direction)
{
    direction = direction || '';
    chars     = chars || '\\s';

    chars = '[' + escapeRegExp(chars) + ']';

    var native   = nativeTrim,
        regLeft  = '^' + chars + '+',
        regRight = chars + '+$',
        regStr   = regLeft + '|' + regRight;

    switch (direction)
    {
        case 'l': native = nativeTrimLeft; regStr = regLeft; break;
        case 'r': native = nativeTrimRight; regStr = regRight; break;
    }

    if (chars === '\\s' && nativeTrim) return native.call(str);

    return direction === '' ? str.replace(new RegExp(regStr, 'g'), '')
                            : str.replace(new RegExp(regStr), '');
};