_('Select $offset $show $css $attr $valueFactory last $remove $event');

$ = function (selector)
{
    return new Select(selector);
};

var $html = $valFactory('innerHTML'),
    $text = $valFactory('textContent'),
    $val = $valFactory('value');

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
        return this.each(function () { $show(this) });
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
        return $html(this, val) || this;
    },
    text: function (val)
    {
        return $text(this, val) || this;
    },
    val: function (val)
    {
        return $val(this, val) || this;
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
    }
});