_('Select $offset $show Delegate');

Select.methods({
    offset: function () { return $offset(this[0]) },
    hide  : function () { return this.css('display', 'none') },
    show  : function () { return this.each(function () { $show(this) }) },
    first : function () { return $(this[0]) },
    last  : function () { return $(this[this.length - 1]) },
    on: function (type, selector, fn)
    {
        if (fn == null)
        {
            fn = selector;
            selector = undefined;
        }

        return this.each(function ()
        {
            Delegate.add(this, type, selector, fn);
        });
    },
    off: function (type, selector, fn)
    {
        if (fn == null)
        {
            fn = selector;
            selector = undefined;
        }

        return this.each(function ()
        {
            Delegate.remove(this, type, fn, selector);
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
    remove: function ()
    {
        var parent;

        return this.each(function ()
        {
            parent = this.parentNode;
            if (parent != null) parent.removeChild(this);
        });
    }
});

$ = function (selector) { return new Select(selector) };