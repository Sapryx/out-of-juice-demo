class ItemInstance {
    /**
     * @param {GameItem} item
     */
    constructor(item) {
        this._item = item;
    }

    /**
     * @returns {GameItem}
     */
    get item() {
        return this._item;
    }
}
