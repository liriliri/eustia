/* function
 * isErr: Checks if value is an Error.
 * value(*): The value to check.
 * return(boolean): Returns true if value is an error object, else false.
 */

'_toStr';

isErr = function (value) { return _toStr.call(value) === '[object Error]' };