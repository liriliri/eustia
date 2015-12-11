// @TODO

'map';

var self = this;

use = function (requires, method)
{
    if (method == null)
    {
        method   = requires;
        requires = [];
    }

    requires = map(requires, function (val) { return _require(val) });
    requires.push(self);

    method.apply(self, requires);
};