class RoomAsset {
    /**
     * @param {string} id
     * @param {Object} config
     */
    constructor(id, config) {
        this._id = id;
        this._doors = [];
        this._spawnPoints = [];
        this._tileset = config.tileset != null
            ? Tileset.fromConfig(config.tileset)
            : null;

        this._tiles = config.cells.map(tileConfig => {
            const tile = new RoomTile();
            tile.position.x = tileConfig.x - config.boundingBox.x;
            tile.position.y = tileConfig.y - config.boundingBox.y;

            if(tileConfig.tile != null) {
                tile.textureOffset = new Vector2(tileConfig.tile.x, tileConfig.tile.y);
            }

            if(tileConfig.data != null) {
                tile.data = tileConfig.data;

                if(tile.data.type === "door") {
                    this._addDoor(tile);
                }

                if(tile.data.type === "spawn") {
                    this._addSpawnPoint(tile);
                }
            }

            return tile;
        });
    }

    get id() {
        return this._id;
    }

    /**
     * @returns {Tileset | null}
     */
    get tileset() {
        return this._tileset;
    }

    /**
     * @returns {Array<RoomTile>}
     */
    getTiles() {
        return this._tiles;
    }

    /**
     * @returns {Array<Door>}
     */
    getDoors() {
        return this._doors.slice();
    }

    /**
     * @returns {Array<SpawnPoint>}
     */
    getSpawnPoints() {
        return this._spawnPoints;
    }

    /**
     * @param {RoomTile} tile
     * @private
     */
    _addDoor(tile) {
        let directionVector = new Vector2(0, 0);

        switch(tile.data.direction) {
            case "north":
                directionVector.y = 1;
                break;
            case "south":
                directionVector.y = -1;
                break;
            case "west":
                directionVector.x = -1;
                break;
            case "east":
                directionVector.x = 1;
                break;
            default:
                throw new Error(`Door at (${tile.position.x};${tile.position.y}) ` +
                    `from "${id}" has invalid or missing direction: "${tile.data.direction}"`);
        }

        const door = new Door(tile.position, directionVector);
        this._doors.push(door);
    }

    /**
     * @param {RoomTile} tile
     * @private
     */
    _addSpawnPoint(tile) {
        const spawnPoint = new SpawnPoint();
        spawnPoint.position = tile.position;
        spawnPoint.def = tile.data.def;
        spawnPoint.chance = nulls.getOr(() => tile.data.chance, 1);

        this._spawnPoints.push(spawnPoint);
    }
}
