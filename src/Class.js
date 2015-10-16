'each toArray';

function makeClass(parent, methods, statics)
{
    statics = statics || {};

    var constructor = function ()
    {
        return this.initialize
               ? this.initialize.apply(this, arguments) || this
               : this;
    };

    constructor.prototype = makeBridge(parent);
    constructor.prototype.superclass = parent;

    each(methods, function (val, key) { constructor.prototype[key] = val });
    each(statics, function (val, key) { constructor[key] = val });

    constructor.extend = function (methods, statics)
    {
        return makeClass(constructor, methods, statics);
    };

    return constructor;
}

var objCreate = Object.create;

function makeBridge(parent)
{
    if (objCreate) return objCreate(parent.prototype);

    var bridge = function () {};
    bridge.prototype = parent.prototype;
    return new bridge();
}

var Base = makeClass(Object, {
    className: 'Base',
    callSuper: function (name)
    {
        var superMethod = this.superclass.prototype[name];

        if (!superMethod) return;

        return superMethod.apply(this, toArray(arguments).slice(1));
    },
    toString: function ()
    {
        return this.className;
    }
});

exports = function (methods, statics) { return Base.extend(methods, statics) };