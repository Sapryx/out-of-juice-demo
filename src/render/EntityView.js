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

    /**
     * @param {Vector2} value
     * @param {float} speed
     */
    animateTo(value, speed) {
        return anim(this._node, {
            __x: value.x * G.config.tileSize,
            __y: value.y * G.config.tileSize
        }, speed, undefined, easeLinear);
    }
}
