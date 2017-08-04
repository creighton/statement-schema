/**
 * This function tests a timestamp string for the preservation of time down to milliseconds.
 */

module.exports = function (time) {
    const t = new Date(time);
    return t.getMilliseconds() !== 0;
}
