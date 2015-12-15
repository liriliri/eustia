// @TODO

/* function
 * isFn: Checks if value is classified as a Function object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

_('_toStr');

isFn = function (val) { return _toStr.call(val) === '[object Function]' };