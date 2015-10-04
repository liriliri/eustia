var _ = require('./util');

_.test('isNumber', function (assert)
{
    assert.ok(!_.isNumber('string'), 'A string is not a number');
    assert.ok(!_.isNumber(arguments), 'The arguments object is not a number');
    assert.ok(!_.isNumber(void 0), 'Undefined is not a number');
    assert.ok(_.isNumber(5), '5 is a number');
});