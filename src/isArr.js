// @TODO

/* function
 * isArr: Check if value is classified as an Array Object
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

var nativeIsArr = Array.isArray;

isArr = nativeIsArr || function (val)
{
    return _toStr.call(val) === '[object Array]';
};