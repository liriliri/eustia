/* function
 * isArray: Check if value is classified as an Array Object
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'toString';

var nativeIsArr = Array.isArray;

exports = nativeIsArr || function (val)
{
    return toString.call(val) === '[object Array]';
};