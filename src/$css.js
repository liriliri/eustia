_('camelize isNum dasherize');

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
    return val + isNum(val) && !cssNumber[dasherize(name)] ? 'px' : '';
}

$css = {
    get: function (node, name)
    {
        return node.style[camelize(name)];
    },
    set: function (node, name, val)
    {

    }
};