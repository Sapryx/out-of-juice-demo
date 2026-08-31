class LevelGenerator {
    constructor() {
        this._roomsToProcess = new Queue();
    }

    generateLevel() {
        const level = new Level();
        const levelType = G.levelTypes.getRandom();
        const startRoomNode = levelType.getRooms().find(roomNode => roomNode.type === "start");
        const startRoomAsset = G.roomAssets.getFirstOfType("start");
        const startRoom = new Room(startRoomNode, startRoomAsset);
        const processedNodes = new Set([startRoomNode]);
        const usedAssets = new Set([startRoomAsset]);

        console.log("Generating level...");
        console.log(`Using level type: ${levelType.id}`);

        G.roomAssets.shuffle();
        this._placeRoom(level, startRoom, new Vector2(0, 0));

        while(!this._roomsToProcess.isEmpty()) {
            const targetRoom = this._roomsToProcess.dequeue();
            const connectedRoomNodes = targetRoom.node.getConnectedNodes();

            for(const roomNode of connectedRoomNodes) {
                if(processedNodes.has(roomNode)) {
                    continue;
                }

                const roomAssetsOfType = G.roomAssets.getForType(roomNode.type);
                const targetDoorCount = roomNode.connectedNodes.length;
                const roomMatch = this._findMatchingRoomAsset(roomAssetsOfType, usedAssets, targetRoom, targetDoorCount);

                if(roomMatch == null) {
                    console.warn(`Could not find a matching asset of type "${roomNode.type}" for "${targetRoom.asset.id}"`);
                    continue;
                }

                this._appendRoom(level, roomMatch, roomNode);

                usedAssets.add(roomMatch.matchedRoomAsset);
                processedNodes.add(roomNode);
            }
        }

        G.gameView.levelView.bakeTiles();
        return level;
    }

    /**
     * @param {Level} level
     * @param {Room} room
     * @param {Vector2} position
     */
    _placeRoom(level, room, position) {
        console.log(`Placing "${room.asset.id}" at (${position.x}; ${position.y})`);

        room.position = position;
        level.addRoom(room);
        this._roomsToProcess.enqueue(room);
    }

    /**
     * @param {Array<RoomAsset>} assets
     * @param {Set<RoomAsset>} usedAssets
     * @param {Room} targetRoom
     * @param {int} doorCount
     * @returns {RoomMatch | null}
     * @private
     */
    _findMatchingRoomAsset(assets, usedAssets, targetRoom, doorCount) {
        for(const candidateAsset of assets) {
            const doorCountMatches = candidateAsset.getDoors().length === doorCount;

            if(usedAssets.has(candidateAsset) || !doorCountMatches) {
                continue;
            }

            const doorPair = this._matchDoors(targetRoom.getFreeDoors(), candidateAsset.getDoors());

            if(doorPair != null) {
                const [door1, door2] = doorPair;
                return new RoomMatch(targetRoom, candidateAsset, door1, door2);
            }
        }

        return null;
    }

    /**
     * @param {Array<Door>} doors1
     * @param {Array<Door>} doors2
     * @returns {[Door, Door] | null}
     */
    _matchDoors(doors1, doors2) {
        for(const door1 of doors1) {
            for(const door2 of doors2) {
                const doorsMatch = math2d.equal(
                    door2.direction,
                    math2d.neg(door1.direction)
                );

                if(doorsMatch) {
                    return [door1, door2];
                }
            }
        }

        return null;
    }

    /**
     * @param {Door} door1
     * @param {Door} door2
     * @returns {Vector2}
     */
    _calculateRoomOffset(door1, door2) {
        const doorOffset = math2d.sub(door1.position, door2.position);

        if(abs(doorOffset.x) > abs(doorOffset.y)) {
            doorOffset.x += sign(doorOffset.x) * 6;
        } else {
            doorOffset.y += sign(doorOffset.y) * 6;
        }

        return doorOffset;
    }

    /**
     * @param {Level} level
     * @param {RoomMatch} roomMatch
     * @param {RoomNode} roomNode
     * @private
     */
    _appendRoom(level, roomMatch, roomNode) {
        const roomOffset = this._calculateRoomOffset(roomMatch.targetDoor, roomMatch.matchedDoor);
        const roomPosition = math2d.add(roomMatch.targetRoom.position, roomOffset);
        const room = new Room(roomNode, roomMatch.matchedRoomAsset);

        this._placeRoom(level, room, roomPosition);

        const hallwayOrigin = math2d.add(roomMatch.targetRoom.position, roomMatch.targetDoor.position);
        const hallwayTarget = math2d.add(room.position, roomMatch.matchedDoor.position);
        const hallwayDirection = roomMatch.targetDoor.direction;

        this._createHallway(level, hallwayOrigin, hallwayTarget, hallwayDirection);

        roomMatch.targetRoom.reserveDoor(roomMatch.targetDoor);
        room.reserveDoor(roomMatch.matchedDoor);
    }

    /**
     * @param {Level} level
     * @param {Vector2} origin
     * @param {Vector2} target
     * @param {Vector2} direction
     * @private
     */
    _createHallway(level, origin, target, direction) {
        console.log(`Creating hallway from ${format(origin)} to ${format(target)}`);

        for(let i = 1; i < 6; i++) {
            const floorPosition = math2d.add(origin, math2d.mul(direction, i));
            const wall1Direction = math2d.rotateCcw(direction);
            const wall2Direction = math2d.rotateCw(direction);
            const wall1Position = math2d.add(floorPosition, wall1Direction);
            const wall2Position = math2d.add(floorPosition, wall2Direction);

            level.placeFloor(floorPosition);
            level.placeWall(wall1Position);
            level.placeWall(wall2Position);
        }
    }
}
