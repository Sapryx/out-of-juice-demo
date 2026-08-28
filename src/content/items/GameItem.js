class GameItem {
    constructor() {
        this._id = "";
        this._name = "";
        this._description = "";
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
