class Item {
    /**
     * @param {ItemAsset} asset
     */
    constructor(asset) {
        this._asset = asset;
    }

    /**
     * @returns {ItemAsset}
     */
    get asset() {
        return this._asset;
    }

    /**
     * @param {GameEntity} user
     * @returns {boolean}
     */
    use(user) {
        return this._asset.use(user);
    }
}
