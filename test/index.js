var _ = require('./testUtil');

_.test('isNum', function (expect)
{
    var isNum = _.isNum;

    expect(isNum(5)).toBeTrue();
    expect(isNum('eustia')).toBeFalse();
});

_.test('isStr', function (expect)
{
    var isStr = _.isStr;

    expect(isStr('eustia')).toBeTrue();
    expect(isStr(5)).toBeFalse();
});