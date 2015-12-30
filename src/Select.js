// @TODO

/* class
 * Select: jQuery like dom manipulator.
 */

_('Class isStr each isObj some camelize isNum dasherize');

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

var cssNumber = {
    'column-count': 1,
    'columns'     : 1,
    'font-weight' : 1,
    'line-weight' : 1,
    'opacity'     : 1,
    'z-index'     : 1,
    'zoom'        : 1
};

function addPx(name, val)
{
    if (isNum(val) && !cssNumber[dasherize(name)]) return val + 'px';

    return val;
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
        if (val == null && isStr(name))
        {
            return this[0].style[camelize(name)];
        }

        var css = '';

        if (isStr(name))
        {
            css = dasherize(name) + ':' + addPx(name, val) + ';';
        } else
        {
            each(name, function (val, key)
            {
                css += dasherize(key) + ':' + addPx(key, val) + ';';
            });
        }

        return this.each(function ()
        {
            this.style.cssText += ';' + css;
        });
    },
    rmAttr: function (name)
    {
        return this.each(function ()
        {
            setAttr(this, name);
        });
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
    hasClass: function (name)
    {
        return some(this, function (el)
        {
            return this.test(el.className);
        }, new RegExp('(^|\\s)' + name + '(\\s|$)'));
    },
    addClass: function (name)
    {
        var newName = name.split(/\s+/g);

        return this.each(function ()
        {
            var classList = [],
                $this = new Select(this);
            each(newName, function (val)
            {
                if (!$this.hasClass(val)) classList.push(val);
            });
            if (classList.length !== 0) this.className += ' ' + classList.join(' ');
        });
    },
    toggleClass: function (name)
    {
        return this.hasClass(name) ? this.rmClass(name) : this.addClass(name);
    },
    rmClass: function (name)
    {
        return this.each(function () { this.classList.remove(name) });
    },
    append: function (val)
    {
        return this.each(function ()
        {
            this.insertAdjacentHTML('beforeend', val);
        });
    },
    before: function (val)
    {
        return this.each(function ()
        {
            this.insertAdjacentHTML('beforebegin', val);
        });
    },
    prepend: function (val)
    {
        return this.each(function ()
        {
            this.insertAdjacentHTML('afterbegin', val);
        });
    }
});

var rootSelect = new Select(document);
