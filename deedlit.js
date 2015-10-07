module.exports = function (deedlit)
{
    deedlit.initConfig({
        protocol: {

        }
    });

    deedlit.loadNpmDocs('protocol');
    deedlit.loadNpmDocs('');

    deedlit.registerDocs();
};