class EntityView {
    constructor(prefab) {
        this._prototype = prefab;
        this._node = null;
    }

    init() {
        this._node = G.gameView.levelView.addNode(this._prototype);
    }

    get node() {
        return this._node;
    }

    get position() {
        return this._node.__ofs;
    }

    set position(value) {
        this._node.__ofs = math2d.mul(value, G.config.tileSize);
    }

    remove() {
        this._node.__removeFromParent();
    }
}
