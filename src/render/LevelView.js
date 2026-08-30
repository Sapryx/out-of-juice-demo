class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this.node = null;
        this._tileBatch = null;
        this._bakedTiles = null;
        this._tileSelectionView = null;
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

    /**
     * @returns {TileSelectionView | undefined}
     */
    get tileSelectionView() {
        return this._tileSelectionView;
    }

    init() {
        this.node = this._parent.__addChildBox("level");
        this._tileBatch = new StaticBatchNode();
        this._tileSelectionView = new TileSelectionView(this.node);

        this.node.add(this._tileBatch);
        this._tileSelectionView.init();
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
        this._tileSelectionView.update();
    }
}
