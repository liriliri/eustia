var exports = function (msg)
{
    console.log(msg);
};

exports.error = function (msg)
{
    console.log(msg);
    process.exit();
};

module.exports = exports;