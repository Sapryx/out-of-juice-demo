class EntityView {
    /**
     * @param {string} prefab
     */
    constructor(prefab) {
        this._prototype = prefab;
        this._node = null;
    }

    init() {
        this._node = G.levelView.addNode(this._prototype);
    }

    /**
     * @returns {Vector2}
     */
    get position() {
        return new Vector2(this._node.__x, this._node.__y);
    }

    /**
     * @param {Vector2} value
     */
    set position(value) {
        this._node.__x = value.x * G.config.tileSize;
        this._node.__y = value.y * G.config.tileSize;
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
