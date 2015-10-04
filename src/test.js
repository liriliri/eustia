var assert = {
    ok: function (result, msg)
    {
        msg = (result ? 'ok' : 'failed, expected argument to be true') + ': ' + msg;

        console.log(msg);
    }
};

exports = function (name, callback)
{
    console.log(name + ':');
    callback(assert);
};