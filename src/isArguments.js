_.isArguments = function (val)
{
    return _.toString.call(val) === '[object Arguments]';
};