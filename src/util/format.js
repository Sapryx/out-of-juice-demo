/**
 * @param {Vector2} vector
 * @returns {string | null}
 */
function format(vector) {
    if(vector instanceof Vector2) {
        return `(${vector.x}, ${vector.y})`;
    }

    return null;
}
