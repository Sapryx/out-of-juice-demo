class RuleTile {
    constructor(config) {
        this._id = config.id;
        this._name = config.name;
        this._defaultTile = new Vector2(config.defaultTile.x, config.defaultTile.y);
        this._rules = config.rules.map(rule => ({
            dirs: Object.assign({}, rule.dirs),
            tile: new Vector2(rule.tile.x, rule.tile.y)
        }));
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    resolve(tiles, position) {
        for(const rule of this._rules) {
            if(this._matchesRule(tiles, position, rule.dirs)) {
                return math2d.copy(rule.tile);
            }
        }

        return math2d.copy(this._defaultTile);
    }

    _matchesRule(tiles, position, dirs) {
        for(const [localDirection, condition] of Object.entries(dirs)) {
            const worldDirection = RuleTile._getDirection(localDirection);
            const neighborPosition = math2d.add(position, worldDirection);
            const neighbor = tiles.get(math2d.getHash(neighborPosition));

            if(!RuleTile._matchesCondition(neighbor, this._name, condition)) {
                return false;
            }
        }

        return true;
    }

    static _matchesCondition(neighbor, ruleTileName, condition) {
        switch(condition) {
            case "this":
                return neighbor != null && neighbor.ruleTileName === ruleTileName;
            case "not":
                return neighbor == null || neighbor.ruleTileName !== ruleTileName;
            case "empty":
                return neighbor == null;
            case "any":
                return true;
            default:
                throw new Error(`Unknown Rule Tile condition: "${condition}"`);
        }
    }

    static _getDirection(direction) {
        const vectors = {
            N: new Vector2(0, 1),
            NE: new Vector2(1, 1),
            E: new Vector2(1, 0),
            SE: new Vector2(1, -1),
            S: new Vector2(0, -1),
            SW: new Vector2(-1, -1),
            W: new Vector2(-1, 0),
            NW: new Vector2(-1, 1)
        };

        const vector = vectors[direction];

        if(vector == null) {
            throw new Error(`Unknown Rule Tile direction: "${direction}"`);
        }

        return vector;
    }
}
