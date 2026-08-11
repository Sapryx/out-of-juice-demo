class Input {
    static init() {
        Input.__horizontal = 0;
        Input.__vertical = 0;
        gestures.__onKeyDown = Input.__onKeyDown;
        gestures.__onKeyUp = Input.__onKeyUp;
    }

    /**
     * @param {Axis} axis
     */
    static getAxis(axis) {
        return axis === Axis.Horizontal ? Input.__horizontal : Input.__vertical;
    }

    /**
     * @param {number} keyCode
     * @param {string} key
     * @param {boolean} ctrl
     * @param {boolean} shift
     * @param {boolean} alt
     * @param e
     */
    static __onKeyDown(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "a":Input.__horizontal = -1; break;
            case "d":Input.__horizontal = 1; break;
            case "w": Input.__vertical = 1; break;
            case "s": Input.__vertical = -1; break;
        }
    }

    /**
     * @param {number} keyCode
     * @param {string} key
     * @param {boolean} ctrl
     * @param {boolean} shift
     * @param {boolean} alt
     * @param e
     */
    static __onKeyUp(keyCode, key, ctrl, shift, alt, e) {
        switch(key.toLowerCase()) {
            case "a":Input.__horizontal = 0; break;
            case "d":Input.__horizontal = 0; break;
            case "w": Input.__vertical = 0; break;
            case "s": Input.__vertical = 0; break;
        }
    }
}
