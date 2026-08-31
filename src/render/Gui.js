class Gui {
    constructor(parent) {
        this._parent = parent;
        this._node = null;
    }

    /**
     * @returns {CameraOrtho | null}
     */
    get camera() {
        return this._node.__camera;
    }

    /**
     * @param {CameraOrtho} value
     */
    set camera(value) {
        this._node.__camera = value;
    }

    /**
     * @returns {ENode | undefined}
     */
    get node() {
        return this._node;
    }

    init() {
        this._node = this._parent.__addChildBox("gui");
    }

    cleanup() {
        this._node.__removeFromParent();
    }

    update() {
        this._node.__init({
            __aliasing1: {
                health_bar_bg: {
                    __text: G.player.health
                }
            }
        });
    }
}
