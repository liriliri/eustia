var chai = require('chai'),
    path = require('path');

var eustia = require('../index');

var expect = chai.expect;

describe('build', function() {
    var buildBasic = buildFactory({
        cwd: __dirname,
        files: './build/basic.*',
        output: './build/eustia.js',
        ignore: '**/*.ignore.js',
        include: 'stripColor',
        exclude: 'endWith',
        extension: ['js', 'txt'],
        transpiler: {
            test: /\.txt$/,
            handler: function(src) {
                return 'exports = "' + src + '";';
            }
        },
        library: path.resolve(__dirname, 'build/eustia'),
        format: 'commonjs'
    });

    it('global module pattern', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.capitalize).to.be.a('function');

            done();
        });
    });

    it('commonjs module pattern', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.now).to.be.a('function');

            done();
        });
    });

    it('es6 module pattern', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.has).to.be.a('function');
            expect(util.startWith).to.be.a('function');

            done();
        });
    });

    it('ignore files', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.stripCmt).to.be.an('undefined');

            done();
        });
    });

    it('include module', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.stripColor).to.be.a('function');

            done();
        });
    });

    it('exclude module', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.endWith).to.be.an('undefined');

            done();
        });
    });

    it('custom module', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.logEustia).to.be.a('function');

            done();
        });
    });

    it('library path', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.logEruda).to.be.a('function');

            done();
        });
    });

    it('dependency resolve', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.trim).to.be.a('function');
            expect(util.ltrim).to.be.a('function');
            expect(util.rtrim).to.be.a('function');

            done();
        });
    });

    it('transpiler', function(done) {
        buildBasic(function(err, util) {
            if (err) return done(err);

            expect(util.eustiaStr).to.equal('eustia');

            done();
        });
    });
});

function buildFactory(options) {
    var done = false,
        building = false,
        callbacks = [],
        error,
        util;

    return function(cb) {
        if (done) {
            return process.nextTick(function() {
                cb(error, util);
            });
        }
        callbacks.push(cb);
        building = true;

        eustia.build(options, function(err) {
            done = true;
            error = err;
            util = require('./build/eustia.js');
            callbacks.forEach(function(cb) {
                cb(err, util);
            });
        });
    };
}
