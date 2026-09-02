class ItemEntity extends GameEntity {
    constructor(config) {
        super(config);

        this.isHostile = false;
        this._item = null;
    }

    get item() {
        return this._item;
    }

    setItem(item) {
        this._item = item;
        G.presenter.onEntitySpriteUpdated(this, item.asset.iconPath);
    }

    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        actor.inventory.addItem(this._item);
        this._die();

        G.presenter.onItemCollected();
    }
}
