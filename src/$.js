include('Select $offset $show $css $attr $property last $remove $data $event $class $insert isUndef isStr');

$ = function (selector)
{
    return new Select(selector);
};

Select.methods({
    offset: function ()
    {
        return $offset(this);
    },
    hide: function ()
    {
        return this.css('display', 'none');
    },
    show: function ()
    {
        $show(this);

        return this;
    },
    first: function ()
    {
        return $(this[0]);
    },
    last: function () {
        return $(last(this));
    },
    eq: function (idx)
    {
        return $(idx);
    },
    on: function (event, selector, handler)
    {
        $event.on(this, event, selector, handler);

        return this;
    },
    off: function (event, selector, handler)
    {
        $event.off(this, event, selector, handler);

        return this;
    },
    html: function (val)
    {
        var result = $property.html(this, val);

        if (isUndef(val)) return result;

        return this;
    },
    text: function (val)
    {
        var result = $property.text(this, val);

        if (isUndef(val)) return result;

        return this;
    },
    val: function (val)
    {
        var result = $property.val(this, val);

        if (isUndef(val)) return result;

        return this;
    },
    css: function (name, val)
    {
        var result = $css(this, name, val);

        if (isGetter(name, val)) return result;

        return this;
    },
    attr: function (name, val)
    {
        var result = $attr(this, name, val);

        if (isGetter(name, val)) return result;

        return this;
    },
    data: function (name, val)
    {
        var result = $data(this, name, val);

        if (isGetter(name, val)) return result;

        return this;
    },
    rmAttr: function (name)
    {
        $attr.remove(this, name);

        return this;
    },
    remove: function ()
    {
        $remove(this);

        return this;
    },
    addClass: function (name)
    {
        $class.add(this, name);

        return this;
    },
    rmClass: function (name)
    {
        $class.remove(this, name);

        return this;
    },
    toggleClass: function (name)
    {
        $class.toggle(this, name);

        return this;
    },
    hasClass: function (name)
    {
        return $class.has(this, name);
    },
    append: function (val)
    {
        return $insert.append(this, val);
    },
    prepend: function (val)
    {
        return $insert.prepend(this, val);
    },
    before: function (val)
    {
        return $insert.before(this, val);
    },
    after: function (val)
    {
        return $insert.after(this, val);
    }
});

function isGetter(name, val)
{
    return isUndef(val) && isStr(name);
}