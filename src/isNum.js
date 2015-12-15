// @TODO

/* function
 * isNum: Checks if value is classified as a Number primitive or object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

_('_toStr');

isNum = function (value) { return _toStr.call(value) === '[object Number]' };