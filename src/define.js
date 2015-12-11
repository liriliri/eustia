// @TODO

define = function (name, requires, method)
{
    if (arguments.length === 2)
    {
        method   = requires;
        requires = [];
    }

    _define(name, requires, method);
};