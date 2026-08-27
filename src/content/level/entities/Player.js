class Player extends GameEntity {
    constructor(config) {
        super(config);
        this._inventory = new Inventory(config.inventorySize);
    }

    _die() {
        super._die();
        restartGame();
    }
}
