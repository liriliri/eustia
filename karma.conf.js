module.exports = function(config)
{
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/util.js',
            'test/*.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'IE'],
        singleRun: false,
        concurrency: Infinity
    });
};