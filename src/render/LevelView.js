class LevelView {
    constructor(parent) {
        this.node = null;
        this._parent = parent;
        this._tileBatch = null;
        this._bakedTiles = null;

        this.tileSelection = null;
    }

    get camera() {
        return this.node.__camera;
    }

    set camera(value) {
        this.node.__camera = value;
    }

    init() {
        this.node = this._parent.__addChildBox("level");
        this._tileBatch = new StaticBatchNode();

        this.tileSelection = this.node.__addChildBox({
            __img: "selection_frame",
            __size: [G.config.tileSize + 2, G.config.tileSize + 2],
            __color: Colors.Selection,
            __z: -100
        });
        this.tileSelection.interaction_name = this.tileSelection.__addChildBox({
            name: "interaction_name",
            __ofs: [0, G.config.tileSize / 1.5 + 2],
            __text: {
                __fontsize: 8,
                __text: ""
            }
        });

        this.node.add(this._tileBatch);
    }

    cleanup() {
        if(this.node) {
            this.node.__removeFromParent();
        }
    }

    addNode(node) {
        return this.node.__addChildBox(node);
    }

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
            this.tileSelection.interaction_name.__alpha = 0;
            return;
        }

        const screenPosition = math2d.mul(math2d.flipY(targetedEntity.position), G.config.tileSize);
        this.tileSelection.__ofs = screenPosition;
        this.tileSelection.__alpha = 1;
        this.tileSelection.interaction_name.__alpha = 1;
        this.tileSelection.interaction_name.__text = targetedEntity.getInteractionName();
    }
}
