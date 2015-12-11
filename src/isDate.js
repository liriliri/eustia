// @TODO

/* function
 * isDate: Checks if value is classified as a Date object.
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

isDate = function (val) { return _toStr.call(val) === '[object Date]' };