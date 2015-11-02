var assert = {
    ok: function (result, msg)
    {
        msg = (result ? 'Ok' : 'Failed, expected argument to be true') + ': ' + msg;

        console.log(msg);
    }
};

test = function (name, callback)
{
    console.log(name + ':');
    callback(assert);
};