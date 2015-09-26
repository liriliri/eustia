(function (global)
{
    var _  = {};

    if (typeof module != 'undefined' && module.exports)
    {
        module.exports = _;
    } else
    {
        global._ = _;
    }

})(window || global);