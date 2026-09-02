class EntityView {
    constructor(prefab) {
        this._prototype = prefab;
        this.node = null;
    }

    init() {
        this.node = G.gameView.levelView.addNode(this._prototype);
    }

    get position() {
        return this.node.__ofs;
    }

    set position(value) {
        this.node.__ofs = math2d.mul(value, G.config.tileSize);
    }

    remove() {
        this.node.__removeFromParent();
    }
}
