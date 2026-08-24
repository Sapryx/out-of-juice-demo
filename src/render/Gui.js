class Gui {
    constructor(parent) {
        this._parent = parent;
        this._node = null;
        this._playerHealthView = null;
        this._debugView = null;
    }

    init() {
        this._node = this._parent.__addChildBox("gui");
        this._playerHealthView = new PlayerHealthView(this._node);
        this._debugView = new DebugView(this._node);

        this._playerHealthView.init();
        this._debugView.init();
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

    update() {
        this._playerHealthView.setValue(G.player.health, G.player.maxHealth);
        this._debugView.update();
    }
}
