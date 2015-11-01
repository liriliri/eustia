/* function
 * isArgs: Checks if value is classified as an arguments object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

isArgs = function (value) { return _toStr.call(value) === '[object Arguments]' };