class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this._node = null;
        this._tileBatch = null;
        this._bakedTiles = null;
        this._tileSelectionView = null;
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

    init() {
        this._node = this._parent.__addChildBox("level");
        this._tileBatch = new StaticBatchNode();
        this._tileSelectionView = new TileSelectionView(this._node);

        this._node.add(this._tileBatch);
        this._tileSelectionView.init();
    }

    cleanup() {
        this._node.__removeFromParent();
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
