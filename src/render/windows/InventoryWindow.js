class InventoryWindow extends GameWindow {
    constructor() {
        super();
        this._id = "inventory_window";
        this._selectedItem = null;
    }

    open() {
        super.open();
        const items = G.player.inventory.getItems();
        const itemCount = G.player.inventory.itemCount;

        if(itemCount === 0) {
            return;
        }

        this._selectedItem = items[0];

        this._fillItemSidebar(items);
        this._updateItemPanel();
    }

    _onShowWindow(windowNode) {
        super._onShowWindow(windowNode);
        const self = this;

        windowNode.__setAliasesData({
            use_button: {
                __onTap() {
                    if(self._selectedItem != null) {
                        self._selectedItem.use(G.player);
                    }
                }
            }
        });
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
     * @private
     */
    _updateItemPanel() {
        const itemPanel = this._node.__findChild(node => node.__userData && node.__userData.type === "item_panel");
        const nameNode = itemPanel.__findChild(node => node.__userData && node.__userData.type === "name");
        const descriptionNode = itemPanel.__findChild(node => node.__userData && node.__userData.type === "description");

        nameNode.__text = this._selectedItem.item.name;
        descriptionNode.__text = this._selectedItem.item.description;
    }
}
