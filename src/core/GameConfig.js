class GameConfig {
    /**
     * @param {int} tileSize
     * @param {float} tilePassTime
     */
    constructor(tileSize, tilePassTime) {
        this._tileSize = tileSize;
        this._tilePassTime = tilePassTime;
    }

    /**
     * @returns {int}
     */
    get tileSize() {
        return this._tileSize;
    }

    /**
     * @returns {float}
     */
    get tilePassTime() {
        return this._tilePassTime;
    }
}
