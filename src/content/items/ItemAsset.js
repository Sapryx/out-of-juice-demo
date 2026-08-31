class ItemAsset {
    constructor(id, config) {
        this._id = id;
        this._name = config.name;
        this._description = config.description;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get iconPath() {
        return this._id;
    }

    use(user) {
        return false;
    }
}
