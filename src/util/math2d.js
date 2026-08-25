const math2d = {
    normalize(vector) {
        let length = math2d.length(vector);
        return new Vector2(vector.x / length, vector.y / length);
    },

    /**
     * @param {Vector2} vector
     * @returns {float}
     */
    length(vector) {
        return sqrt(vector.x * vector.x + vector.y * vector.y);
    },

    /**
     * @param {Vector2} vector1
     * @param {Vector2} vector2
     * @returns {Vector2}
     */
    add(vector1, vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    },

    /**
     * @param {Vector2} vector1
     * @param {Vector2} vector2
     * @returns {Vector2}
     */
    sub(vector1, vector2) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    },

    /**
     * @param {Vector2} vector
     * @param {number} scalar
     * @returns {Vector2}
     */
    mul(vector, scalar) {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    },

    /**
     * @param {Vector2} vector
     * @param {number} scalar
     */
    div(vector, scalar) {
        return new Vector2(vector.x / scalar, vector.y / scalar);
    },

    /**
     * @param {Vector2} vector1
     * @param {Vector2} vector2
     * @returns {boolean}
     */
    equal(vector1, vector2) {
        return vector1.x === vector2.x && vector1.y === vector2.y;
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    neg(vector) {
        return new Vector2(-vector.x, -vector.y);
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    flipY(vector) {
        return new Vector2(vector.x, -vector.y);
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    rotateCw(vector) {
        return new Vector2(vector.y, -vector.x);
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    rotateCcw(vector) {
        return new Vector2(-vector.y, vector.x);
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    round(vector) {
        return new Vector2(round(vector.x), round(vector.y));
    },

    /**
     * @param {Vector2} vector
     * @returns {Vector2}
     */
    copy(vector) {
        return new Vector2(vector.x, vector.y);
    }
};
