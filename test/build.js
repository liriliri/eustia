var eustia = require('../index');

describe('build', function ()
{
    it('should has trim included', function (done)
    {
        eustia.build({
            files: './test/build/index.html',
            output: './test/build/util.js'
        }, function (err)
        {
            done(err);
        });
    });
});