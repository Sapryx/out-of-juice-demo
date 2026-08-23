class LevelView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._node = parent.__addChildBox("level");
        this._tileBatch = new StaticBatchNode();
        this._bakedTiles = null;

        this._node.add(this._tileBatch);
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
}
