// @TODO

/* function
 * isInt: Checks if value is classified as a Integer.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'isNum';

isInt = function (val) { return isNum(val) && (val % 1 === 0) };