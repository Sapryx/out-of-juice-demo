class ItemCardView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._parent = parent;
        this._node = null;
        this._nameNode = null;
        this._iconNode = null;
    }

    init() {
        this._node = this._parent.__addChildBox("item_card");
        this._nameNode = this._node.__findChild(node => node.__userData && node.__userData.type === "name");
        this._iconNode = this._node.__findChild(node => node.__userData && node.__userData.type === "icon");
    }

    /**
     * @param {ItemAsset} item
     */
    set(item) {
        this._nameNode.__text = item.name;
        this._iconNode.__img = item.iconPath;
    }
}
