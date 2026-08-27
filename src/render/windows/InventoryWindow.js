class InventoryWindow extends GameWindow {
    constructor() {
        super();
        this._id = "inventory_window";
    }

    open() {
        super.open();
        const itemSidebar = this._node.__findChild(node => node.__userData && node.__userData.type === "item_sidebar");
    }
}
