class EntityView {
    /**
     * @param {string} prefab
     */
    constructor(prefab) {
        this._prototype = prefab;
        this._node = null;
    }

    init() {
        this._node = G.gameView.levelView.addNode(this._prototype);
    }

    /**
     * @returns {ENode | undefined}
     */
    get node() {
        return this._node;
    }

    /**
     * @returns {Vector2}
     */
    get position() {
        return this._node.__ofs;
    }

    /**
     * @param {Vector2} value
     */
    set position(value) {
        this._node.__ofs = math2d.mul(value, G.config.tileSize);
    }
}
