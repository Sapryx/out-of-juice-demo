class Room {
    /**
     * @param {RoomNode} node
     * @param {RoomAsset} asset
     * @param {int} [rotation]
     */
    constructor(node, asset, rotation = 0) {
        this.node = node;
        this.asset = asset;
        this.position = new Vector2(0, 0);
        this.rotation = rotation;
        this._freeDoors = asset.getDoors(rotation);
    }

    getTiles() {
        return this.asset.getTiles(this.rotation);
    }

    /**
     * @returns {Array<SpawnPoint>}
     */
    getSpawnPoints() {
        return this.asset.getSpawnPoints(this.rotation);
    }

    getFreeDoors() {
        return this._freeDoors;
    }

    reserveDoor(door) {
        const doorIndex = this._freeDoors.findIndex(freeDoor =>
            math2d.equal(freeDoor.position, door.position)
            && math2d.equal(freeDoor.direction, door.direction)
        );

        if(doorIndex === -1) {
            throw Error("Cannot delete door from room: door not found")
        }

        this._freeDoors.splice(doorIndex, 1);
    }
}
