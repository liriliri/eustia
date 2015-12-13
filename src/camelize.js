// @TODO

/* function
 * camelCase: Convert string to "camelCase" text.
 */

camelize = function (str)
{
    return str.replace(/-+(.)?/g, function (match, char)
    {
        return char ? char.toUpperCase() : '';
    });
};