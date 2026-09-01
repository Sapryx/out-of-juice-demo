class RuleTileRegistry {
    constructor() {
        this._ruleTiles = new Map();
    }

    register(ruleTile) {
        this._ruleTiles.set(ruleTile.name, ruleTile);
    }

    get(name) {
        const ruleTile = this._ruleTiles.get(name);

        if(!ruleTile) {
            throw new Error(`Rule tile "${name}" is not registered`);
        }

        return ruleTile;
    }
}
