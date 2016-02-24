// TODO

/* function
 * isStr: Checks if value is classified as a String primitive or object.
 * value(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

include('objToStr');

isStr = function (value) { return objToStr(value) === '[object String]' };

