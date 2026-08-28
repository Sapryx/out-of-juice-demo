class InventoryWindow extends GameWindow {
    constructor() {
        super();
        this._id = "inventory_window";
    }

    open() {
        super.open();
        const items = G.player.inventory.getItems();
        const itemCount = G.player.inventory.itemCount;

        if(itemCount === 0) {
            return;
        }

        this._fillItemSidebar(items);
        this._updateItemPanel(items);
    }

    /**
     * @param {ReadonlyArray<ItemInstance>} items
     * @private
     */
    _fillItemSidebar(items) {
        const itemSidebar = this._node.__findChild(node => node.__userData && node.__userData.type === "item_sidebar");

        for(const item of items) {
            if(item == null) {
                continue;
            }

            const itemCard = new ItemCardView(itemSidebar);
            itemCard.init();
            itemCard.set(item.item);
        }
    }

    /**
     * @param {ReadonlyArray<ItemInstance>} items
     * @private
     */
    _updateItemPanel(items) {
        const itemPanel = this._node.__findChild(node => node.__userData && node.__userData.type === "item_panel");
        const nameNode = itemPanel.__findChild(node => node.__userData && node.__userData.type === "name");
        const descriptionNode = itemPanel.__findChild(node => node.__userData && node.__userData.type === "description");
        const firstItem = items[0];

        nameNode.__text = firstItem.item.name;
        descriptionNode.__text = firstItem.item.description;
    }
}
