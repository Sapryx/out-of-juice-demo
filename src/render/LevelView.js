class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this._node = null;
        this._tileBatch = new StaticBatchNode();
        this._bakedTiles = null;
        this._tileSelectionView = null;
    }

    init() {
        this._node = this._parent.__addChildBox("level");
        this._node.add(this._tileBatch);
        this._tileSelectionView = new TileSelectionView(this._node);

        this._tileSelectionView.init();
    }

    /**
     * @returns {CameraOrtho | null}
     */
    get camera() {
        return this._node.__camera;
    }

    /**
     * @param {CameraOrtho} value
     */
    set camera(value) {
        this._node.__camera = value;
    }

    /**
     * @param {Node | string} node
     * @returns {Node}
     */
    addNode(node) {
        return this._node.__addChildBox(node);
    }

    /**
     * @param {Node} node
     * @returns {Node}
     */
    addBakedNode(node) {
        return this._tileBatch.__addChildBox(node);
    }

    bakeTiles() {
        if(this._bakedTiles != null) {
            this._bakedTiles.__removeFromParent();
        }

        this._bakedTiles = this._tileBatch.__bake();
        this._node.add(this._bakedTiles);
    }

    update() {
        this._tileSelectionView.update();
    }
}
