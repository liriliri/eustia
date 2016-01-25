describe('$attr', function ()
{
    var $attr = _.$attr;

    $('body').append('<div id="dollarAttr"></div>');

    var $dom = $('#dollarAttr');

    it('retrieve node\'s attribute with given name', function ()
    {
        $dom.append('<div class="getter"></div>');

        var $el = $dom.find('.getter');

        $attr($el, 'data-multiple', 'true');
        expect($el.attr('data-multiple')).to.equal('true');

        $attr($el.get(0), 'data-multiple', 'false');
        expect($el.attr('data-multiple')).to.equal('false');
    });

    it('set node\'s attribute with given name and value', function ()
    {
        $dom.append('<div class="setter"></div>');

        var $el = $dom.find('.setter');

        $attr($el, 'data-single', 'true');
        expect($el.attr('data-single')).to.equal('true');

        $attr($el, {
            'data-multiple-one': 'true',
            'data-multiple-two': 'true'
        });
        expect($el.attr('data-multiple-one')).to.equal('true');
        expect($el.attr('data-multiple-two')).to.equal('true');
    });

    it('remove node\'s attribute with given name', function ()
    {
        $dom.append('<div class="remove"></div>');

        var $el = $dom.find('.remove');

        $el.attr('data-one', 'true')
           .attr('data-two', 'true')
           .attr('data-three', 'true');

        $attr.remove($el, 'data-one');
        expect($el).to.not.have.attr('data-one');
        $attr.remove($el, ['data-one', 'data-two']);
        expect($el).to.not.have.attr('data-two', 'data-three');
    });

    $dom.remove();
});