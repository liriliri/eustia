_('toArr isObj isStr each');

$attr = function (nodes, name, val)
{
    nodes = toArr(nodes);

    if (arguments.length === 2 && isStr(name)) return getAttr(nodes[0], name);

    var attrs = name;
    if (!isObj(attrs))
    {
        attrs = {};
        attrs[name] = val;
    }

    setAttr(nodes, attrs);
};

$attr.remove = function (nodes, names)
{
    nodes = toArr(nodes);
    names = toArr(names);

    each(nodes, function (node)
    {
        each(names, function (name)
        {
            node.removeAttribute(name);
        });
    });
};

function getAttr(node, name)
{
    return node.getAttribute(name);
}

function setAttr(nodes, attrs)
{
    each(nodes, function (node)
    {
        each(attrs, function (val, name)
        {
            node.setAttribute(name, val);
        });
    })
}