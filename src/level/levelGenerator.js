class LevelGenerator {
    constructor() {
        this._roomsToProcess = new Queue();
        this._tileBatch = null;
    }

    generateLevel() {
        const level = new Level();
        this._tileBatch = new StaticBatchNode();
        const levelType = G.levelTypeRegistry.getRandom();
        const startRoomNode = levelType.getRooms().find(roomNode => roomNode.type === "start");
        const startRoomAsset = G.roomAssetRegistry.getFirstOfType("start");
        const startRoom = new Room(startRoomNode, startRoomAsset);
        const processedNodes = new Set([startRoomNode]);

        console.log("Generating level...");
        console.log(`Using level type: ${levelType.id}`);
        console.log(`Discovered ${G.roomAssetRegistry.count} unique rooms`);

        this._placeRoom(level, startRoom, new Vector2(0, 0));

        while(!this._roomsToProcess.isEmpty()) {
            const currentRoom = this._roomsToProcess.dequeue();
            const connectedNodes = currentRoom.node.getConnectedNodes();

            for(const candidateNode of connectedNodes) {
                if(processedNodes.has(candidateNode)) {
                    continue;
                }

                const roomAssetsOfType = G.roomAssetRegistry.getForType(candidateNode.type);

                for(const candidateAsset of roomAssetsOfType) {
                    if(candidateAsset.getDoors().length !== candidateNode.connectedNodes.length) {
                        continue;
                    }

                    const [doorOffset, door1, door2] = this._matchDoors(currentRoom.getFreeDoors(), candidateAsset.getDoors());

                    if(doorOffset == null) {
                        continue;
                    }

                    if(abs(doorOffset.x) > abs(doorOffset.y)) {
                        doorOffset.x += sign(doorOffset.x) * 6;
                    } else {
                        doorOffset.y += sign(doorOffset.y) * 6;
                    }

                    const roomPosition = math2d.add(currentRoom.position, doorOffset);
                    const candidateRoom = new Room(candidateNode, candidateAsset);

                    this._placeRoom(level, candidateRoom, roomPosition);

                    currentRoom.reserveDoor(door1);
                    candidateRoom.reserveDoor(door2);
                    roomAssetsOfType.splice(roomAssetsOfType.indexOf(candidateAsset), 1);
                    processedNodes.add(candidateNode);

                    break;
                }
            }
        }

        G.levelView.add(this._tileBatch.__bake());

        return level;
    }

    /**
     * @param {Array<Door>} freeDoors1
     * @param {Array<Door>} freeDoors2
     * @returns {[Vector2, Door, Door]}
     */
    _matchDoors(freeDoors1, freeDoors2) {
        for(const door1 of freeDoors1) {
            for(const door2 of freeDoors2) {
                const doorsMatch = math2d.equal(
                    door2.direction,
                    math2d.neg(door1.direction)
                );

                if(!doorsMatch) {
                    continue;
                }

                const offset = math2d.sub(door1.position, door2.position);

                return [offset, door1, door2];
            }
        }

        return [null, null, null];
    }


    /**
     * @param {Level} level
     * @param {Room} room
     * @param {Vector2} position
     */
    _placeRoom(level, room, position) {
        room.position = position;

        this._roomsToProcess.enqueue(room);
        level.pushRoom(room);

        console.log(`Placing "${room.asset.id}" at (${position.x}; ${position.y})`);

        for(const tile of room.asset.getTiles()) {
            const tileViewParent = tile.isWall ? this._tileBatch : G.levelView;
            const tileView = tileViewParent.__addChildBox({
                __img: "white",
                __size: [G.config.tileSize, G.config.tileSize]
            });
            tileView.__x = (position.x + tile.position.x) * G.config.tileSize;
            tileView.__y = -(position.y + tile.position.y) * G.config.tileSize;
            tileView.__color = 0xFF0000;
            tileView.__text = {
                __text: `(${position.x + tile.position.x};${position.y + tile.position.y})`,
                __fontsize: 10
            };

            if(tile.data != null) {
                if(tile.data.type === "door") {
                    tileView.__color = 0x0000FF;
                } else {
                    tileView.__color = 0x00FF00;
                }
            }
        }
    }
}
