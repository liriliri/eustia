var _      = require('./util/node'),
    expect = require('expect.js');

var State = _.State;

describe('State', function ()
{
    var state;

    it('create a state with initial state "one"', function ()
    {
        state = new _.State('one', {
            oneToTwo: {
                from: 'one',
                to  : 'two'
            },
            twoToOne: {
                from: 'one',
                to  : 'two'
            }
        });

        expect(state.is('one')).to.be(true);
    });

    it('change state from "one" to "two"', function ()
    {
        state.oneToTwo();
        expect(state.is('two')).to.be(true);
    });
});