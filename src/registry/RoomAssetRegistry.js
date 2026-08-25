class RoomAssetRegistry {
    constructor() {
        this._roomAssets = new Map();
    }

    /**
     * @returns {int}
     */
    get count() {
        let total = 0;
        this._roomAssets.forEach(it => total += it.length);

        return total;
    }

    /**
     * @param {string} type
     * @param {RoomAsset} roomAsset
     */
    register(type, roomAsset) {
        if(!this._roomAssets.has(type)) {
            this._roomAssets.set(type, []);
        }

        const roomAssetsOfType = this._roomAssets.get(type);
        roomAssetsOfType.push(roomAsset);
    }

    shuffle() {
        for(const roomAssetsOfType of this._roomAssets.values()) {
            list.shuffle(roomAssetsOfType);
        }
    }

    /**
     * @param {string} type
     * @returns {Array<RoomAsset>}
     */
    getForType(type) {
        return this._roomAssets.get(type);
    }

    /**
     * @param {string} type
     * @returns {RoomAsset}
     */
    getFirstOfType(type) {
        const roomAssetsOfType = this._roomAssets.get(type);

        if(roomAssetsOfType === undefined) {
            throw new Error(`No rooms of type '${type}' registered`);
        }

        return roomAssetsOfType[0];
    }
}
