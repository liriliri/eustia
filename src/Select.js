'Class isStr each isObj';

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

Select = Class({
    className: 'Select',
    initialize: function (selector)
    {
        this.length = 0;

        if (!selector) return this;

        if (isStr(selector)) return rootSelect.find(selector);

        if (selector.nodeType)
        {
            this[0]     = selector;
            this.length = 1;
        }
    },
    find: function (selector)
    {
        var ret = new Select;

        this.each(function ()
        {
            mergeArr(ret, this.querySelectorAll(selector));
        });

        return ret;
    },
    each: function (fn)
    {
        each(this, function (element, idx)
        {
            fn.call(element, idx, element);
        });

        return this;
    },
    css: function (name, val)
    {
        if (val === undefined) return this[0].style[name];

        return this.each(function ()
        {
            this.style[name] = val;
        });
    },
    hide: function ()
    {
        return this.css('display', 'none');
    },
    attr: function (name, val)
    {
        if (val == null && isStr(name))
        {
            return this[0].getAttribute(name);
        }

        return this.each(function ()
        {
            var self = this;

            if (isObj(name))
            {
                each(name, function (val, key) { setAttr(self, key, val) });
            } else
            {
                setAttr(this, name, val);
            }
        });
    },
    data: function (name, val)
    {
        var newName = name;

        if (isStr(name)) newName = 'data-' + name;
        if (isObj(name))
        {
            newName = {};
            each(name, function (val, key) { newName['data-' + key] = val });
        }

        return this.attr(newName, val);
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
    on: function (type, fn)
    {
        return this.each(function ()
        {
            this.addEventListener(type, fn, false);
        });
    },
    off: function (type, fn)
    {
        return this.each(function ()
        {
            this.removeEventListener(type, fn);
        });
    },
    first: function () { return new Select(this[0]) },
    last : function () { return new Select(this[this.length - 1]) },
    addClass: function (name)
    {
        return this.each(function () { this.classList.add(name) });
    },
    rmClass: function (name)
    {
        return this.each(function () { this.classList.remove(name) });
    }
});

var rootSelect = new Select(document);
