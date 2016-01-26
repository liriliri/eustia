_('toArr each');

$remove = function (nodes)
{
    nodes = toArr(nodes);

    each(nodes, function (node)
    {
        var parent = node.parentNode;

        if (parent) parent.removeChild(node);
    });
};