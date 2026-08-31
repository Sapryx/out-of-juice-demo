class Player extends GameEntity {
    constructor(config) {
        super(config);
        this.inventory = new Inventory(config.inventorySize);

        this.inventory.addItem(new Item(G.itemAssets.get("bandage")));
        this.inventory.addItem(new Item(G.itemAssets.get("bandage")));
        this.inventory.addItem(new Item(G.itemAssets.get("bandage")));
        this.inventory.addItem(new Item(G.itemAssets.get("bandage")));
    }

    _die() {
        super._die();
        restartGame();
    }
}
