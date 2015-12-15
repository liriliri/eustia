// @TODO

/* function
 * isErr: Checks if value is an Error.
 * value(*): The value to check.
 * return(boolean): Returns true if value is an error object, else false.
 */

_('_toStr');

isErr = function (val) { return _toStr.call(val) === '[object Error]' };