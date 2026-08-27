class GameConfig {
    /**
     * @param {Object} config
     */
    constructor(config) {
        this._tileSize = config.tileSize;
        this._tilePassTime = config.tilePassTime;
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
