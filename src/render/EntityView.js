class EntityView {
    /**
     * @param {string} prefab
     */
    constructor(prefab) {
        this._prototype = prefab;
        this._node = null;
    }

    init() {
        this._node = G.levelView.__addChildBox(this._prototype);
    }

    /**
     * @param {Vector2} value
     */
    set position(value) {
        this._node.__x = value.x * G.config.tileSize;
        this._node.__y = value.y * G.config.tileSize;
    }

    /**
     * @param {Vector2} worldPos
     * @param {float} speed
     */
    animateTo(worldPos, speed) {
        return anim(this._node, {
            __x: worldPos.x * G.config.tileSize,
            __y: -worldPos.y * G.config.tileSize
        }, speed);
    }
}
