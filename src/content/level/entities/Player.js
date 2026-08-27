class Player extends GameEntity {
    constructor(config) {
        super(config);
        this.inventory = new Inventory(config.inventorySize);

        this.inventory.addItem(new ItemInstance(new BandageItem()));
    }

    _die() {
        super._die();
        restartGame();
    }
}
