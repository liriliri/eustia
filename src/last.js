// TODO

/* function
 * last: Gets the last element of array.
 * array(array): The array to query.
 * return(*): Returns the last element of array.
 */

last = function (arr)
{
    var len = arr ? arr.length : 0;

    return len ? arr[len - 1] : undefined;
};