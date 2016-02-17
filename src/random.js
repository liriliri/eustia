// TODO

/* function
 * random: Produces a random number between min and max (inclusive).
 * min(number): The minimum possible value.
 * max(number): The maximum possible value.
 * return(number): Returns the random number.
 */

random = function (min, max)
{
    if (max == null)
    {
        max = min;
        min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
};