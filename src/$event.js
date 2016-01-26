_('delegate toArr isUndef');

$event = {
    on: eventFactory('add'),
    off: eventFactory('remove')
};

function eventFactory(type)
{
    return function (nodes, event, selector, handler)
    {
        nodes = toArr(nodes);

        if (isUndef(handler))
        {
            handler = selector;
            selector = undefined;
        }

        each(nodes, function (node)
        {
            delegate[type](node, event, selector, handler);
        });
    };
}