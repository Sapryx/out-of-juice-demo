class Gui {
    constructor(parent) {
        this._parent = parent;
        this._node = null;
        this._debugView = null;
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
        this._debugView = new DebugView(this._node);
        this._debugView.init();
    }

    cleanup() {
        this._node.__removeFromParent();
    }

    update() {
        this._node.__init({
            __aliasing1: {
                health_bar: {
                    __text: G.player.health
                },

                health_bar_fill: {
                    __width: G.player.health / G.player.maxHealth
                }
            }
        });

        this._debugView.update();
    }
}
