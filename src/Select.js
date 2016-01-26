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
