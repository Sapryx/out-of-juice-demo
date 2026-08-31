class ItemAsset {
    constructor(id, config) {
        this._id = id;
        this._name = config.name;
        this._description = config.description;
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {string}
     */
    get description() {
        return this._description;
    }

    /**
     * @returns {string}
     */
    get iconPath() {
        return this._id;
    }

    /**
     * @param {GameEntity} user
     * @returns {boolean}
     */
    use(user) {
        return false;
    }
}
