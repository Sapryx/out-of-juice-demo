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
            const localX = tileConfig.x - config.boundingBox.x;
            const localY = tileConfig.y - config.boundingBox.y;

            tile.position.x = localX;
            tile.position.y = (config.boundingBox.height - 1) - localY;

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
     * @param {int} [rotation] - number of 90° clockwise rotation steps (0-3)
     * @returns {Array<RoomTile>}
     */
    getTiles(rotation = 0) {
        if(rotation === 0) {
            return this._tiles;
        }

        return this._tiles.map(tile => {
            const rotatedTile = new RoomTile();

            rotatedTile.position = math2d.rotate(tile.position, rotation);
            rotatedTile.data = tile.data;
            rotatedTile.textureOffset = tile.textureOffset;

            return rotatedTile;
        });
    }

    /**
     * @param {int} [rotation] - number of 90° clockwise rotation steps (0-3)
     * @returns {Array<Door>}
     */
    getDoors(rotation = 0) {
        return this._doors.map(door => new Door(
            math2d.rotate(door.position, rotation),
            math2d.rotate(door.direction, rotation)
        ));
    }

    /**
     * @param {int} [rotation] - number of 90° clockwise rotation steps (0-3)
     * @returns {Array<SpawnPoint>}
     */
    getSpawnPoints(rotation = 0) {
        if(rotation === 0) {
            return this._spawnPoints;
        }

        return this._spawnPoints.map(spawnPoint => {
            const rotatedSpawnPoint = new SpawnPoint();

            rotatedSpawnPoint.position = math2d.rotate(spawnPoint.position, rotation);
            rotatedSpawnPoint.def = spawnPoint.def;
            rotatedSpawnPoint.chance = spawnPoint.chance;
            rotatedSpawnPoint.item = spawnPoint.item;

            return rotatedSpawnPoint;
        });
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
        spawnPoint.item = nulls.getOr(() => tile.data.item, null);

        this._spawnPoints.push(spawnPoint);
    }
}
