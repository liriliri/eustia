/* function
 *
 * allKeys: Retrieve all the names of object's own and inherited properties.
 * object(object): The object to query.
 * return(array): Returns the array of all property names.
 *
 * ```javascript
 * var obj = Object.create({ a: 0 });
 * obj.b = 1;
 * _.allKeys(obj) // -> ['a', 'b']
 * ```
 */

allKeys = function (obj)
{
    var keys = [], key;

    for (key in obj) keys.push(key);

    return keys;
};