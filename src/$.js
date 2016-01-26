_('Select $offset $show $css $attr $property last $remove $event $class');

$ = function (selector)
{
    return new Select(selector);
};

Select.methods({
    offset: function ()
    {
        return $offset(this[0]);
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
    on: function (event, selector, handler)
    {
        $event.on(event, selector, handler);

        return this;
    },
    off: function (event, selector, handler)
    {
        $event.off(this, event, selector, handler);

        return this;
    },
    html: function (val)
    {
        return $property.html(this, val) || this;
    },
    text: function (val)
    {
        return $property.text(this, val) || this;
    },
    val: function (val)
    {
        return $property.val(this, val) || this;
    },
    css: function (name, val)
    {
        return $css(this, name, val) || this;
    },
    attr: function (name, val)
    {
        return $attr(this, name, val) || this;
    },
    data: function (name, val)
    {
        return $data(this, name, val) || this;
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
    }
});