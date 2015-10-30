'Class isString each isObject';

function mergeArr(first, second)
{
    var len = second.length,
        i   = first.length;

    for (var j = 0; j < len; j++) first[i++] = second[j];

    first.length = i;

    return first;
}

function setAttr(node, name, val)
{
    val == null ? node.removeAttribute(name) : node.setAttribute(name, val);
}

var Select = Class({
    className: 'Select',
    initialize: function (selector)
    {
        this.length = 0;

        if (isString(selector)) return rootSelect.find(selector);

        if (selector.nodeType)
        {
            this[0]     = selector;
            this.length = 1;
        }

        return this;
    },
    find: function (selector)
    {
        var ret = new Select;

        this.each(function (element)
        {
            mergeArr(ret, element.querySelectorAll(selector));
        });

        return ret;
    },
    each: function (fn)
    {
        each(this, function (element, idx)
        {
            fn.call(element, element, idx);
        });
    },
    attr: function (name, val)
    {
        if (val == null && isString(name))
        {
            return this[0].getAttribute(name);
        }

        return this.each(function ()
        {
            var self = this;

            if (isObject(name))
            {
                each(name, function (val, key) { setAttr(self, key, val) });
            } else
            {
                setAttr(this, name, val);
            }
        });
    },
    html: function (val)
    {
        if (val == null) return this[0].innerHTML;

        return this.each(function () { this.innerHTML = val });
    },
    text: function (val)
    {
        if (val == null) return this[0].textContent;

        return this.each(function () { this.textContent = val });
    },
    val: function (val)
    {
        if (val == null) return this[0].value;

        return this.each(function () { this.value = val });
    },
    first: function () { return new Select(this[0]) },
    last : function () { return new Select(this[this.length - 1]) },
    addClass: function ()
    {

    },
    rmClass: function ()
    {

    }
});

var rootSelect = new Select(document);

exports = Select;
