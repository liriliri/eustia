// @TODO

/* function
 * keys: Creates an array of the own enumerable property names of object.
 * object(object): The object to query.
 * return(array): Returns the array of property names.
 */

'isObj has';

var nativeKeys = Object.keys;

keys = nativeKeys || function (obj)
{
    var keys = [];

    for (var key in obj) { if (has(obj, key)) keys.push(key) }

    return keys;
};