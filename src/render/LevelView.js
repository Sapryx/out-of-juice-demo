class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this.node = null;
        this._tileBatch = null;
        this._bakedTiles = null;

        this.tileSelection = null;
    }

    /**
     * @returns {CameraOrtho | null}
     */
    get camera() {
        return this.node.__camera;
    }

    /**
     * @param {CameraOrtho} value
     */
    set camera(value) {
        this.node.__camera = value;
    }

    init() {
        this.node = this._parent.__addChildBox("level");
        this._tileBatch = new StaticBatchNode();

        this.tileSelection = this.node.__addChildBox({
            __img: "selection_frame",
            __size: [G.config.tileSize, G.config.tileSize],
            __z: -100
        });

        this.node.add(this._tileBatch);
    }

    cleanup() {
        this.node.__removeFromParent();
    }

    /**
     * @param {ENode | string} node
     * @returns {ENode}
     */
    addNode(node) {
        return this.node.__addChildBox(node);
    }

    /**
     * @param {ENode} node
     * @returns {ENode}
     */
    addBakedNode(node) {
        return this._tileBatch.__addChildBox(node);
    }

    bakeTiles() {
        if(this._bakedTiles != null) {
            this._bakedTiles.__removeFromParent();
        }

        this._bakedTiles = this._tileBatch.__bake();
        this.node.add(this._bakedTiles);
        this._bakedTiles.__z = SpriteSorting.getZ(SortingLayer.Floor);
    }

    update() {
        const screenPosition = math2d.mul(math2d.flipY(G.targeting.position), G.config.tileSize);

        this.tileSelection.__init({
            __ofs: screenPosition,
            __color: 0x00FF00
        });
    }

    _getSelectionColor(position) {
        const selectedEntity = G.level.getEntityInTile(position);

        if(!selectedEntity || selectedEntity === G.player) {
            return 0xFFFFFF;
        }

        if(G.player.canAttack(selectedEntity)) {
            return 0x00FF00;
        }

        return 0xFF0000;
    }
}
