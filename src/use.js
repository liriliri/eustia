'map';

exports = function (requires, method)
{
    if (method == null)
    {
        requires = [];
        method   = requires;
    }

    requires = map(requires, function (val) { return _require(val) });
    requires.push(s);

    method.apply(s, requires);
};