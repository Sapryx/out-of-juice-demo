class Player extends GameEntity {
    constructor(config) {
        super(config);
        this.inventory = new Inventory(config.inventorySize);
    }

    _die() {
        super._die();
        BUS.__post(E.PlayerDeath, this);
    }
}
