exports = Date.now || function ()
{
    return new Date().getTime();
};