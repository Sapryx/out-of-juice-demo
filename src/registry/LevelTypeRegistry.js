class LevelTypeRegistry {
    constructor() {
        this._levelTypes = new Map();
    }

    get count() {
        return this._levelTypes.length;
    }

    register(levelType) {
        this._levelTypes.set(levelType.id, levelType);
    }

    get(id) {
        const levelType = this._levelTypes.get(id);

        if(!levelType) {
            throw new Error(`Level type with id ${id} is no registered`);
        }

        return levelType;
    }
}
