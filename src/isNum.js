// TODO

/* function
 * isNum: Checks if value is classified as a Number primitive or object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

include('objToStr');

isNum = function (value) { return objToStr(value) === '[object Number]' };