var objCreate = Object.create;

function noop() {}

exports = function (Class, SuperClass)
{
    if (objCreate)
    {
        Class.prototype = objCreate(SuperClass.prototype);
        return;
    }

    noop.prototype = SuperClass.prototype;
    Class.prototype = new noop();
};