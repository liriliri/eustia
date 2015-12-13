/* function
 *
 * isUndef: Checks if value is undefined.
 * value(*): The value to check.
 * return(boolean): Returns true if value is undefined, else false.
 *
 * ```javascript
 * _.isUndef(void 0) // -> true
 * _.isUndef(null) // ->false
 * ```
 * undefined
 */

isUndef = function (value) { return value === void 0 };