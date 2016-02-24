/* function
 * isFn: Check if value is a function.
 * value(*): The value to check.
 * return(boolean): True if value is a function, else false.
 */

include('objToStr');

isFn = function (val)
{
    return objToStr(val) === '[object Function]';
};