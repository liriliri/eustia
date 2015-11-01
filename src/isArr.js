/* function
 * isArr: Check if value is classified as an Array Object
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

var nativeIsArr = Array.isArray;

isArr = nativeIsArr || function (value)
{
    return _toStr.call(value) === '[object Array]';
};