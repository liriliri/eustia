// TODO

/* function
 * isArgs: Checks if value is classified as an arguments object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

include('objToStr');

isArgs = function (val) { return objToStr(val) === '[object Arguments]' };