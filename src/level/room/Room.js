class Room {
    /**
     * @param {RoomNode} node
     * @param {RoomAsset} asset
     */
    constructor(node, asset) {
        this.node = node;
        this.asset = asset;
        this.position = new Vector2(0, 0);
        this._freeDoors = asset.getDoors();
    }

    init() {
        for(const spawnPoint of this.asset.getSpawnPoints()) {
            if(spawnPoint.def === "player") {
                continue;
            }

            const entity = G.defs.create(spawnPoint.def);
            const globalPosition = math2d.add(this.position, spawnPoint.position);

            G.level.addEntity(entity, globalPosition);
        }
    }

    /**
     * @returns {Array<Door>}
     */
    getFreeDoors() {
        return this._freeDoors;
    }

    /**
     * @param {Door} door
     */
    reserveDoor(door) {
        const doorIndex = this._freeDoors.indexOf(door);

        if(doorIndex === -1) {
            throw Error("Cannot delete door from room: door not found")
        }

        this._freeDoors.splice(doorIndex, 1);
    }
}
