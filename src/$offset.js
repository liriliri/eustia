$offset = function (el)
{
    var clientRect = el.getBoundingClientRect();

    return {
        left: clientRect.left + window.pageXOffset,
        top : clientRect.top  + window.pageYOffset,
        width : Math.round(clientRect.width),
        height: Math.round(clientRect.height)
    };
};