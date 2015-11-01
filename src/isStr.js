/* function
 * isStr: Checks if value is classified as a String primitive or object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'_toStr';

isStr = function (value) { return _toStr.call(value) === '[object String]' };

