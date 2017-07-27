/**
 *
 */

module.exports = function (time) {
    const t = new Date(time);
    return t.getMilliseconds() !== 0;
}
