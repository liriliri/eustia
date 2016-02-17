/* function
 * keys: Creates an array of the own enumerable property names of object.
 * object(object): The object to query.
 * return(array): Returns the array of property names.
 */

include('has');

keys = Object.keys || function (obj)
{
    var ret = [], key;

    for (key in obj)
    {
        if (has(obj, key)) ret.push(key);
    }

    return ret;
};