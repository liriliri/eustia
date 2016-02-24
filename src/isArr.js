/* function
 * isArr: Check if value is an array.
 * value(*): The value to check.
 * return(boolean): True if value is an array, else false.
 */

include('objToStr');

isArr = Array.isArray || function (val)
{
    return objToStr(val) === '[object Array]';
};