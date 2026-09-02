class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this.node = null;
        this._parent = parent;
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
            __color: Colors.Selection,
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
        this._bakedTiles.__z = SortingOrder.get(SortingLayer.Floor);
    }

    update() {
        const targetedEntity = G.targeting.current;

        if(!targetedEntity) {
            this.tileSelection.__alpha = 0;
            return;
        }

        const screenPosition = math2d.mul(math2d.flipY(targetedEntity.position), G.config.tileSize);
        this.tileSelection.__ofs = screenPosition;
        this.tileSelection.__alpha = 1;
    }
}
