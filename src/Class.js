// @TODO

'extend toArray inherits has';

var regCallSuper = /callSuper/;

function makeClass(parent, methods, statics)
{
    statics = statics || {};

    var ctor = function ()
    {
        var args = toArray(arguments);

        if (has(ctor.prototype, 'initialize') &&
            !regCallSuper.test(this.initialize.toString()) &&
            this.callSuper)
        {
            args.unshift('initialize');
            this.callSuper.apply(this, args);
            args.shift();
        }

        return this.initialize
               ? this.initialize.apply(this, args) || this
               : this;
    };

    inherits(ctor, parent);
    ctor.superclass = ctor.prototype.superclass = parent;

    ctor.extend   = function (methods, statics) { return makeClass(ctor, methods, statics) };
    ctor.inherits = function (Class) { inherits(Class, ctor) };
    ctor.methods  = function (methods) { extend(ctor.prototype, methods); return ctor };
    ctor.statics  = function (statics) { extend(ctor, statics); return ctor };

    ctor.methods(methods).statics(statics);

    return ctor;
}

Class = function (methods, statics) { return Base.extend(methods, statics) };

var Base = Class.Base = makeClass(Object, {
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