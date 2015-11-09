var _ = require('./testUtil');

_.test('has', function (expect)
{
    var has = _.has,
        obj = { a: 0 };

    expect(has(obj, 'a')).toBeTrue();
    expect(has(obj, 'b')).toBeFalse();
    expect(has(obj, 'toString')).toBeFalse();
});

_.test('isBool', function (expect)
{
    var isBool = _.isBool;

    expect(isBool(true)).toBeTrue();
    expect(isBool(false)).toBeTrue();
    expect(isBool(5)).toBeFalse();
    expect(isBool('eustia')).toBeFalse();
});

_.test('isFn', function (expect)
{
    var isFn = _.isFn;

    expect(isFn(function () {})).toBeTrue();
    expect(isFn({})).toBeFalse();
});

_.test('isNum', function (expect)
{
    var isNum = _.isNum;

    expect(isNum(5)).toBeTrue();
    expect(isNum('eustia')).toBeFalse();
});

_.test('isObj', function (expect)
{
    var isObj = _.isObj;

    expect(isObj({})).toBeTrue();
    expect(isObj(function () {})).toBeTrue();
    expect(isObj(5)).toBeFalse();
});

_.test('isStr', function (expect)
{
    var isStr = _.isStr;

    expect(isStr('eustia')).toBeTrue();
    expect(isStr(5)).toBeFalse();
});

_.test('keys', function (expect)
{
    var keys = _.keys;

    expect(keys({ a: 0, b: 1 })).toEqual(['a', 'b']);
    expect(keys({})).toEqual([]);
});