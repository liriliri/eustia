/* function
 * keys: Creates an array of the own enumerable property names of object.
 * object(object): The object to query.
 * return(array): Returns the array of property names.
 */

_('has');

keys = Object.keys || function (obj)
{
    var ret = [];

    for (var key in obj)
    {
        if (has(obj, key)) ret.push(key);
    }

    return ret;
};