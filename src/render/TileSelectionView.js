class TileSelectionView {
    constructor(parent) {
        this._parent = parent;
    }

    init() {
        this._node = this._parent.__addChildBox({
            __img: "selection_frame",
            __size: [G.config.tileSize, G.config.tileSize],
            __z: -100
        });
    }

    update() {
        const gridPosition = Input.getMouseGridPosition(G.gameView.levelView.camera);
        const screenPosition = math2d.mul(math2d.flipY(gridPosition), G.config.tileSize);

        this._node.__x = screenPosition.x;
        this._node.__y = screenPosition.y;
    }
}
