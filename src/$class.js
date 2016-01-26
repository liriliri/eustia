_('toArr some');

$class = {
    add: function (nodes, name)
    {
        var names = toArr(name);

        each(nodes, function (node)
        {
            var classList = [];

            each(names, function (name)
            {
                if (!$class.hasClass(node, name)) classList.push(name);
            });

            if (classList.length !== 0) node.className += ' ' + classList.join(' ');
        });
    },
    has: function (nodes, name)
    {
        var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

        return some(nodes, function (node)
        {
            return regName.test(node.className);
        });
    },
    toggle: function (nodes, name)
    {
        each(nodes, function (node)
        {
            if ($class.has(node, name)) return $class.add(node, name);

            $class.remove(node);
        });
    },
    remove: function (nodes, name)
    {
        var names = toArr(name);

        each(nodes, function (node)
        {
            each(names, function (name)
            {
                node.classList.remove(name);
            });
        });
    }
};