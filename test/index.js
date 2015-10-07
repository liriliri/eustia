var _ = require('./testUtil');

_.test('isNumber', function (assert)
{
    assert.ok(!_.isNumber('string'), 'A string is not a number');
    assert.ok(!_.isNumber(arguments), 'The arguments object is not a number');
    assert.ok(!_.isNumber(void 0), 'Undefined is not a number');
    assert.ok(_.isNumber(5), '5 is a number');
    assert.ok(_.isNumber(NaN), 'NaN is a number');
    assert.ok(_.isNumber(Infinity), 'Infinity is a number');
    assert.ok(!_.isNumber('1'), 'Numeric string is not a number');
});

_.test('isString', function (assert)
{
    assert.ok(_.isString('string'), 'A string is a string');
    var strObj = new String('string');
    assert.ok(_.isString('strObj'), 'A string object is a string');
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