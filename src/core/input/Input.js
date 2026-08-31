class Input {
    static init() {
        Input._upIsPressed = false;
        Input._downIsPressed = false;
        Input._leftIsPressed = false;
        Input._rightIsPressed = false;
        Input._attackIsPressed = false;

        gestures.__onKeyDown = Input._onKeyDown;
        gestures.__onKeyUp = Input._onKeyUp;
    }

    static reset() {
        Input._attackIsPressed = false;
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
        const cameraPosition = new Vector2(camera.__x, camera.__y);

        const screenOffset = math2d.flipY(math2d.sub(screenPosition, __screenCenter));
        const worldOffset = math2d.div(screenOffset, camera.__zoom);
        const worldPixelPosition = math2d.add(worldOffset, cameraPosition);

        return math2d.div(worldPixelPosition, G.config.tileSize);
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
                if(Input._rightIsPressed) {
                    return 1;
                }

                if(Input._leftIsPressed) {
                    return -1;
                }

                return 0;
            }

            case Axis.Vertical: {
                if(Input._downIsPressed) {
                    return -1;
                }

                if(Input._upIsPressed) {
                    return 1;
                }

                return 0;
            }
        }
    }

    /**
     * @returns {boolean}
     */
    static consumeAttack() {
        if(Input._attackIsPressed) {
            console.log("k");
            Input._attackIsPressed = false;
            return true;
        }

        return false;
    }

    /**
     * @param {number} keyCode
     * @param {string} key
     * @param {boolean} ctrl
     * @param {boolean} shift
     * @param {boolean} alt
     * @param {Object} e
     */
    static _onKeyDown(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "w": Input._upIsPressed = true; break;
            case "s": Input._downIsPressed = true; break;
            case "a": Input._leftIsPressed = true; break;
            case "d": Input._rightIsPressed = true; break;
            case " ": Input._attackIsPressed = true; break;

            case "i": {
                if(G.windows.isOpen(WindowType.Inventory)) {
                    G.windows.closeCurrentWindow();
                    return;
                }

                if(!G.windows.hasOpenWindow) {
                    G.windows.openInventoryWindow();
                }

                break;
            }

            case "escape": {
                if(G.windows.hasOpenWindow) {
                    G.windows.closeCurrentWindow();
                } else {
                    G.windows.openPauseWindow();
                }
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
    static _onKeyUp(keyCode, key, ctrl, shift, alt, e) {
        switch(key) {
            case "w": Input._upIsPressed = false; break;
            case "s": Input._downIsPressed = false; break;
            case "a": Input._leftIsPressed = false; break;
            case "d": Input._rightIsPressed = false; break;
            case " ": Input._attackIsPressed = false; break;
        }
    }
}
