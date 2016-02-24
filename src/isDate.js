// TODO

/* function
 * isDate: Checks if value is classified as a Date object.
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

include('objToStr');

isDate = function (val) { return objToStr(val) === '[object Date]' };