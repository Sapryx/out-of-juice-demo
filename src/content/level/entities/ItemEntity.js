class ItemEntity extends GameEntity {
    constructor(config) {
        super(config);

        this._item = null;
    }

    get item() {
        return this._item;
    }

    setItem(item) {
        this._item = item;
        G.presenter.onEntitySpriteUpdate(this, item.asset.iconPath);
    }
}
