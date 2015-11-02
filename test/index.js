var _ = require('./testUtil');

_.test('isNum', function (assert)
{
    assert.ok(!_.isNum('string'), 'A string is not a number');
    assert.ok(!_.isNum(arguments), 'The arguments object is not a number');
    assert.ok(!_.isNum(void 0), 'Undefined is not a number');
    assert.ok(_.isNum(5), '5 is a number');
    assert.ok(_.isNum(NaN), 'NaN is a number');
    assert.ok(_.isNum(Infinity), 'Infinity is a number');
    assert.ok(!_.isNum('1'), 'Numeric string is not a number');
});

_.test('isStr', function (assert)
{
    assert.ok(_.isStr('string'), 'A string is a string');
    var strObj = new String('string');
    assert.ok(_.isStr('strObj'), 'A string object is a string');
});

_.test('extend', function ()
{
    var ret = _.extend({}, {b:5});
    console.log(ret.b);
});

_.test('clone', function ()
{
    var ret = _.clone([1, 2]);
    console.log(ret);
});

_.test('map', function ()
{
    var ret = _.map([1, 2, 3], function (val)
    {
        return val * 2;
    });

    console.log(ret);
});

_.test('deepClone', function ()
{
    console.log(_.deepClone({
        a: 5,
        b: [1, 2, 3]
    }));
});

_.test('deepExtend', function ()
{
    console.log(_.deepExtend({
        a: 1
    }, {
        b: 2,
        c: [1, 2, 3]
    }));
});

_.test('trim', function ()
{
    console.log(_.trim('  fdsf+   '));
});

_.test('ltrim', function ()
{
    console.log(_.ltrim('  fdsf+', '+ '));
});

_.test('rtrim', function ()
{
    console.log(_.rtrim('  fdsf+', '+ '));
});
