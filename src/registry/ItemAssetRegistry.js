class ItemAssetRegistry {
    constructor() {
        this._assets = new Map();
    }

    get count() {
        return this._assets.size;
    }

    register(id, itemAsset) {
        this._assets.set(id, itemAsset);
    }

    get(id) {
        return this._assets.get(id);
    }
}
