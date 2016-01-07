module.exports = function(config)
{
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        'SL_InternetExplorer': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '10'
        },
        'SL_FireFox': {
            base: 'SauceLabs',
            browserName: 'firefox'
        }
    };

    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/util.js',
            'test/*.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['dots', 'saucelabs'],
        port: 9876,
        sauceLabs: {
            testName: 'Eustia Default Utils'
        },
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
};