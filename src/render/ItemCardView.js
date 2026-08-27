class ItemCardView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this._node = null;
    }

    init() {
        this._node = this._parent.__addChildBox("item_card");
    }

    /**
     * @param {GameItem} item
     */
    set(item) {
        this._nameText.__text = item.name;
        this._icon.__img = item.iconPath;
    }
}
