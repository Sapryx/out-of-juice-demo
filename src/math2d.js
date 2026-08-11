const math2d = {
    normalize(vector) {
        let length = math2d.length(vector);
        return new Vector2(vector.x / length, vector.y / length);
    },

    /**
     * @param {Vector2} vector
     * @returns {number}
     */
    length(vector) {
        return sqrt(vector.x * vector.x + vector.y * vector.y);
    }
};
