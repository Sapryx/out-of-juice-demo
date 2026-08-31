class LevelTypeRegistry {
    constructor() {
        this._levelTypes = [];
    }

    get count() {
        return this._levelTypes.length;
    }

    /**
     * @param {LevelType} levelType
     */
    register(levelType) {
        this._levelTypes.push(levelType);
    }

    /**
     * @returns {LevelType | undefined}
     */
    getRandom() {
        const randomIndex = ceil(random() * this._levelTypes.length - 1);
        return this._levelTypes[randomIndex];
    }
}
