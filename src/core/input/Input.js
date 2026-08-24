class Input {
    static init() {
        Input.__upPressed = false;
        Input.__downPressed = false;
        Input.__leftPressed = false;
        Input.__rightPressed = false;

        gestures.__onKeyDown = Input.__onKeyDown;
        gestures.__onKeyUp = Input.__onKeyUp;
    }

    /**
     * @returns {Vector2}
     */
    static getMouseScreenPosition() {
        return new Vector2(mouse.x / layoutsResolutionMult, mouse.y / layoutsResolutionMult);
    }

    /**
     * @param {CameraOrtho} camera
     * @returns {Vector2}
     */
    static getMouseWorldPosition(camera) {
        const screenPosition = Input.getMouseScreenPosition();

        const worldX = (screenPosition.x - __screenCenter.x) / camera.__zoom + camera.__x;
        const worldY = ((__screenCenter.y - screenPosition.y) / camera.__zoom) + camera.__y;
        const worldPosition = math2d.div(new Vector2(worldX, worldY), G.config.tileSize);

        return worldPosition;
    }

    static getMouseGridPosition(camera) {
        return math2d.round(Input.getMouseWorldPosition(camera));
    }

    /**
     * @param {Axis} axis
     */
    static getAxis(axis) {
        switch(axis) {
            case Axis.Horizontal: {
                if(Input.__rightPressed) {
                    return 1;
                }

                if(Input.__leftPressed) {
                    return -1;
                }

                return 0;
            }

            case Axis.Vertical: {
                if(Input.__downPressed) {
                    return -1;
                }

                if(Input.__upPressed) {
                    return 1;
                }

                return 0;
            }
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
    static __onKeyDown(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "w": Input.__upPressed = true; break;
            case "s": Input.__downPressed = true; break;
            case "a": Input.__leftPressed = true; break;
            case "d": Input.__rightPressed = true; break;
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
        switch(key) {
            case "w": Input.__upPressed = false; break;
            case "s": Input.__downPressed = false; break;
            case "a": Input.__leftPressed = false; break;
            case "d": Input.__rightPressed = false; break;
        }
    }
}
