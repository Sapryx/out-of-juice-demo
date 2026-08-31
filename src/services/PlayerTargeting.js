class PlayerTargeting {
    constructor() {
        this._targets = [];
        this._index = 0;

        this._offsets = [
            new Vector2(0, 1),
            new Vector2(1, 1),
            new Vector2(1, 0),
            new Vector2(1, -1),
            new Vector2(0, -1),
            new Vector2(-1, -1),
            new Vector2(-1, 0),
            new Vector2(-1, 1)
        ];
    }

    get current() {
        return this._targets.length > 0
            ? this._targets[this._index]
            : null;
    }

    get count() {
        return this._targets.length;
    }

    update() {
        const origin = G.player.position;
        const previousEntity = this.current;
        const entitiesInRange = [];

        for(const offset of this._offsets) {
            const position = math2d.add(origin, offset);
            const entity = G.level.getEntityInTile(position);

            if(entity != null) {
                entitiesInRange.push(entity);
            }
        }

        this._targets = entitiesInRange;

        if(entitiesInRange.length === 0) {
            this._index = 0;
            return;
        }

        const shouldKeepTarget = entitiesInRange.indexOf(previousEntity);
        this._index = shouldKeepTarget !== -1 ? shouldKeepTarget : 0;
    }

    selectNext() {
        if(this._targets.length === 0) {
            return null;
        }

        this._index = (this._index + 1) % this._targets.length;
        return this.current;
    }

    selectPrevious() {
        if(this._targets.length === 0) {
            return null;
        }

        this._index = (this._index - 1 + this._targets.length) % this._targets.length;
        return this.current;
    }
}
