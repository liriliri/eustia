/* function
 * allKeys: Retrieve all the names of object's own and inherited properties.
 * object(object): The object to query.
 * return(array): Returns the array of all property names.
 */

allKeys = function (obj)
{
    var keys = [];

    for (var key in obj) keys.push(key);

    return keys;
};