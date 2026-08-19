class RoomAsset {
    /**
     * @param {string} id
     * @param {Object} config
     */
    constructor(id, config) {
        this._id = id;
        this._doors = [];
        this._tiles = config.cells.map(tileConfig => {
            const tile = new RoomTile();
            tile.position.x = tileConfig.x - config.boundingBox.x;
            tile.position.y = tileConfig.y - config.boundingBox.y;

            if(tileConfig.tile != null) {
                tile.textureOffset = new Vector2(tileConfig.tile.x, tileConfig.tile.y);
            }

            tile.data = tileConfig.data;

            const tileIsDoor = tile.data != null && tile.data.type === "door";

            if(tileIsDoor) {
                let directionVector = new Vector2(0, 0);

                switch(tile.data.direction) {
                    case "north": directionVector.y = 1; break;
                    case "south": directionVector.y = -1; break;
                    case "west": directionVector.x = -1; break;
                    case "east": directionVector.x = 1; break;
                    default:
                        throw new Error(`Door at (${tile.position.x};${tile.position.y}) ` +
                            `from "${id}" has invalid or missing direction: "${tile.data.direction}"`);
                }

                const door = new Door(tile.position, directionVector);
                this._doors.push(door);
            }

            return tile;
        });
    }

    get id() {
        return this._id;
    }

    /**
     * @returns {Array<RoomTile>}
     */
    getTiles() {
        return this._tiles;
    }

    getDoors() {
        return this._doors;
    }
}
