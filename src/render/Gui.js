class Gui {
    constructor(parent) {
        this._node = parent.__addChildBox("gui");
        this.playerHealthView = new PlayerHealthView(this._node);
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
        this.playerHealthView.setValue(G.player.health, G.player.maxHealth);
    }
}
