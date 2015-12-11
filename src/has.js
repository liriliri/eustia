// @TODO

/* function
 * has: Checks if key is a direct property.
 * object(object): The object to query.
 * key(string): The path to check.
 * return(boolean): Returns true if key is a direct property, else false.
 */

var hasOwnProp = Object.prototype.hasOwnProperty;

has = function (obj, key) { return hasOwnProp.call(obj, key) };