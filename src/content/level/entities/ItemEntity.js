class ItemEntity extends GameEntity {
    constructor(config) {
        super(config);

        this.isHostile = false;
        this._item = null;
    }

    get item() {
        return this._item;
    }

    getInteractionName() {
        return "collect";
    }

    getInteractionAction(actor) {
        return new InteractAction(actor, this);
    }

    interactWith(actor) {
        actor.inventory.addItem(this._item);
        this._die();

        BUS.__post(E.ItemCollected);
    }

    setItem(item) {
        this._item = item;
        BUS.__post(E.EntitySpriteUpdated, this, item.asset.iconPath);
    }
}
