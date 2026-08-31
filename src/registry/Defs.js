class Defs {
    constructor() {
        this._configs = new Map();
        this._factories = new Map();
    }

    get count() {
        return this._configs.size;
    }

    /**
     * @param {string} id
     * @param config
     * @param factory
     */
    register(id, config, factory) {
        this._configs.set(id, config);
        this._factories.set(id, factory);
    }

    /**
     * @param {string} id
     * @returns {GameEntity}
     */
    create(id) {
        const config = this._configs.get(id);
        const factory = this._factories.get(id);
        const entity = new factory(config);

        return entity;
    }
}
