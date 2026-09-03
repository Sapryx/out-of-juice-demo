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

        this._node.health_bar.health_bar_fill.__width = G.player.health / G.player.maxHealth;
        this.update();
    }

    cleanup() {
        if(this._node) {
            this._node.__removeFromParent();
        }
    }

    update() {
        this._node.health_bar.health_bar_bg.__text = G.player ? G.player.health : 0;

        // this._node.__init({
        //     __aliasing1: {
        //         health_bar_bg: {
        //             __text: G.player ? G.player.health : 0
        //         }
        //     }
        // });
    }
}
