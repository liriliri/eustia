var elDisplay = {};

function defDisplay(nodeName)
{
    var el, display;

    if (!elDisplay[nodeName])
    {
        el = document.createElement(nodeName);
        document.body.appendChild(el);
        display = getComputedStyle(el, '').getPropertyValue("display");
        el.parentNode.removeChild(el);
        display == "none" && (display = "block");
        elDisplay[nodeName] = display;
    }

    return elDisplay[nodeName];
}

$show = function (el)
{
    if (getComputedStyle(el, '').getPropertyValue('display') == 'none')
    {
        el.style.display = defDisplay(el.nodeName);
    }
};