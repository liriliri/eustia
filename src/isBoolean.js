/* function
 * isBoolean: Checks if value is classified as a boolean primitive or object.
 * val(*): The value to check.
 * return(boolean): Returns true if value is correctly classified, else false.
 */

'toString';

exports = function (val)
{
    return val === true  ||
           val === false ||
           toString.call(val) === '[object Boolean]';
};