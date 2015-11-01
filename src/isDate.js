/* function
 * isDate: Checks if value is classified as a Date object.
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

isDate = function (value) { return _toStr.call(value) === '[object Date]' };