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
        this._node.__color = this._getSelectionColor(gridPosition);
    }

    /**
     * @returns {int}
     * @private
     */
    _getSelectionColor(position) {
        const selectedEntity = G.level.getEntityInTile(position);

        if(selectedEntity === undefined || selectedEntity === G.player) {
            return 0xFFFFFF;
        }

        if(G.player.canAttack(selectedEntity)) {
            return 0x00FF00;
        }

        return 0xFF0000;
    }
}
