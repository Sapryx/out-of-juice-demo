class InventoryWindow extends GameWindow {
    constructor() {
        super();
        this._id = "inventory_window";
    }

    open() {
        super.open();
        const itemSidebar = this._node.__findChild(node => node.__userData && node.__userData.type === "item_sidebar");
        const inventory = G.player.inventory;

        for(const item of inventory.getItems()) {
            if(item == null) {
                continue;
            }

            const itemCard = new ItemCardView(itemSidebar);
            itemCard.init();
            itemCard.set(item.item);
        }
    }
}
