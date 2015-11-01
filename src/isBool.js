/* function
 * isBool: Checks if value is classified as a boolean primitive or object.
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

isBool = function (value) { return value === true || value === false };