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

    /**
     * @param {GameEntity} user
     * @returns {boolean}
     */
    use(user) {
        return this._item.use(user);
    }
}
