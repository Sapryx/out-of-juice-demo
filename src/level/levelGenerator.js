class LevelGenerator {
    constructor() {
        this._roomsToProcess = new Queue();
    }

    generateLevel() {
        const level = new Level();
        const levelType = G.levelTypeRegistry.getRandom();
        const startRoomNode = levelType.getRooms().find(roomNode => roomNode.type === "start");
        const startRoomAsset = G.roomAssetRegistry.getFirstOfType("start");
        const startRoom = new Room(startRoomNode, startRoomAsset);
        const processedNodes = new Set([startRoomNode]);

        console.log("Generating level...");
        console.log(`Using level type: ${levelType.id}`);
        console.log(`Discovered ${G.roomAssetRegistry.count} unique rooms`);

        this._placeRoom(new Vector2(0, 0), startRoom);
        this._roomsToProcess.enqueue(startRoom);

        while(!this._roomsToProcess.isEmpty()) {
            const currentRoom = this._roomsToProcess.dequeue();
            const connectedNodes = currentRoom.node.getConnectedNodes();

            for(const candidateNode of connectedNodes) {
                if(processedNodes.has(candidateNode)) {
                    continue;
                }

                console.log(candidateNode.type);
                const roomAssetsOfType = G.roomAssetRegistry.getForType(candidateNode.type);

                for(const candidateAsset of roomAssetsOfType) {
                    const [doorOffset, door1, door2] = this._matchDoors(currentRoom.getFreeDoors(), candidateAsset.getDoors());

                    if(doorOffset == null) {
                        continue;
                    }

                    const roomPosition = math2d.add(currentRoom.position, doorOffset);
                    const candidateRoom = new Room(candidateNode, candidateAsset);
                    this._placeRoom(roomPosition, candidateRoom);

                    currentRoom.reserveDoor(door1);
                    candidateRoom.reserveDoor(door2);
                    roomAssetsOfType.splice(roomAssetsOfType.indexOf(candidateAsset), 1);
                    processedNodes.add(candidateNode);

                    this._roomsToProcess.enqueue(candidateRoom);
                    break;
                }
            }
        }

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

                const offset = math2d.sub(door2.position, door1.position);

                return [offset, door1, door2];
            }
        }

        return [null, null, null];
    }

    /**
     * @param {Vector2} position
     * @param {Room} room
     */
    _placeRoom(position, room) {
        room.position = position;

        console.log(`Placing "${room.asset.id}" at (${position.x}; ${position.y})`);

        for(const tile of room.asset.getTiles()) {
            const tileView = G.levelView.__addChildBox("entities/sweeper.json");
            tileView.__width = G.config.tileSize;
            tileView.__height = G.config.tileSize;
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
