// TODO

/* function
 * isErr: Checks if value is an Error.
 * value(*): The value to check.
 * return(boolean): Returns true if value is an error object, else false.
 */

include('objToStr');

isErr = function (val) { return objToStr(val) === '[object Error]' };