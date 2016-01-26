_('toArr isUndef each');

$propFactory = function (name)
{
    return function (nodes, val)
    {
        nodes = toArr(nodes);

        if (isUndef(val)) return nodes[0][name];

        each(nodes, function (node)
        {
            node[name] = val;
        });
    };
};
