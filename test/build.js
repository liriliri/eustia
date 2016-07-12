var chai = require('chai'),
    fs = require('fs'),
    path = require('path');

var eustia = require('../index');

var expect = chai.expect;

describe('build', function ()
{
    it('basic', function (done)
    {
        eustia.build({
            files: './test/build/index.html',
            output: './test/build/util.basic.js'
        }, function (err)
        {
            if (err) done(err);

            readFile('./build/util.basic.js', function (err, data)
            {
                if (err) done(err);

                expect(data).to.contain('has');
                expect(data).to.contain('now');

                done();
            });
        });
    });
});

function readFile(filePath, cb)
{
    fs.readFile(path.resolve(__dirname, filePath), 'utf-8', cb);
}