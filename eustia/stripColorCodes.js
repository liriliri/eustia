var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

stripColorCodes = function (str)
{
    return str.replace(regColor, '');
};