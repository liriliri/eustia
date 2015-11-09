'Emitter isEqual';

function print(str) { console.log(str) }

var Expect = Emitter.extend({
    className: 'Expect',
    initialize: function (name, value)
    {
        this.name  = name;
        this.value = value;

        this.on('error', function (msg) { print('Error: ' + msg) });

        this.on('ok', function (msg) { print('Ok: ' + msg) });
    },
    toEqual: function (targetVal)
    {
        isEqual(this.value, targetVal)
        ? this.emit('ok', this.value + ' is ' + targetVal + '.')
        : this.emit('error', this.value + ' should be ' + targetVal + '.');
    },
    toBe: function (targetVal)
    {
        this.value === targetVal
        ? this.emit('ok', this.value + ' is ' + targetVal + '.')
        : this.emit('error', this.value + ' should be ' + targetVal + '.');
    },
    toBeTrue: function () { this.toBe(true) },
    toBeFalse: function () { this.toBe(false) }
});

test = function (name, cb)
{
    print('Running test ' + name + ':');

    cb(function (val) { return new Expect(name, val) });
};