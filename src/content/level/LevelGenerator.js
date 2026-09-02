class LevelGenerator {
    constructor() {
        this._roomsToProcess = new Queue();
    }

    generateLevel() {
        while(true) {
            const level = this._tryGenerateLevel();

            if(level) {
                level.resolveRuleTiles();
                level.recalculateBounds();
                BUS.__post(E.LevelRender, level);
                G.gameView.levelView.bakeTiles();

                return level;
            }

            console.warn("Generated level was invalid. Restarting...");
        }
    }

    _tryGenerateLevel() {
        this._roomsToProcess = new Queue();

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

                if(!roomMatch) {
                    console.warn(`Could not find a matching asset of type "${roomNode.type}" for "${targetRoom.asset.id}"`);
                    continue;
                }

                if(!this._appendRoom(level, roomMatch, roomNode)) {
                    return null;
                }

                usedAssets.add(roomMatch.matchedRoomAsset);
                processedNodes.add(roomNode);
            }
        }

        return level;
    }

    _placeRoom(level, room, position) {
        console.log(`Placing "${room.asset.id}" at (${position.x}; ${position.y})`);

        room.position = position;
        level.addRoom(room);
        this._roomsToProcess.enqueue(room);
    }

    _findMatchingRoomAsset(assets, usedAssets, targetRoom, doorCount) {
        for(const candidateAsset of assets) {
            const doorCountMatches = candidateAsset.getDoors().length === doorCount;

            if(usedAssets.has(candidateAsset) || !doorCountMatches) {
                continue;
            }

            const rotations = list.shuffle([0, 1, 2, 3]);

            for(const rotation of rotations) {
                const rotatedDoors = candidateAsset.getDoors(rotation);
                const doorPair = this._matchDoors(targetRoom.getFreeDoors(), rotatedDoors);

                if(doorPair) {
                    const [door1, door2] = doorPair;
                    return new RoomMatch(targetRoom, candidateAsset, door1, door2, rotation);
                }
            }
        }

        return null;
    }

    _matchDoors(doors1, doors2) {
        for(const door1 of doors1) {
            for(const door2 of doors2) {
                const doorsMatch = math2d.equal(door2.direction, math2d.neg(door1.direction));

                if(doorsMatch) {
                    return [door1, door2];
                }
            }
        }

        return null;
    }

    _appendRoom(level, roomMatch, roomNode) {
        const hallwayLength = randomInt(G.config.hallwayMinLength, G.config.hallwayMaxLength);
        const roomOffset = this._calculateRoomOffset(roomMatch.targetDoor, roomMatch.matchedDoor, hallwayLength);
        const roomPosition = math2d.add(roomMatch.targetRoom.position, roomOffset);
        const room = new Room(roomNode, roomMatch.matchedRoomAsset, roomMatch.matchedRotation);

        if(level.doesRoomOverlap(room, roomPosition)) {
            console.warn(`Room "${room.asset.id}" overlaps existing tiles`);
            return false;
        }

        this._placeRoom(level, room, roomPosition);

        const hallwayOrigin = math2d.add(roomMatch.targetRoom.position, roomMatch.targetDoor.position);
        const hallwayTarget = math2d.add(room.position, roomMatch.matchedDoor.position);
        const hallwayDirection = roomMatch.targetDoor.direction;

        this._createHallway(
            level,
            hallwayOrigin,
            hallwayTarget,
            hallwayDirection,
            hallwayLength,
            roomMatch.targetRoom.asset.getPrimaryRuleTileName(),
            roomMatch.targetRoom.asset.tileset
        );

        roomMatch.targetRoom.reserveDoor(roomMatch.targetDoor);
        room.reserveDoor(roomMatch.matchedDoor);
        return true;
    }

    _calculateRoomOffset(door1, door2, hallwayLength) {
        const doorOffset = math2d.sub(door1.position, door2.position);

        if(door1.direction.x !== 0) {
            doorOffset.x += door1.direction.x * hallwayLength;
        } else {
            doorOffset.y += door1.direction.y * hallwayLength;
        }

        return doorOffset;
    }

    _createHallway(level, origin, target, direction, length, ruleTileName, tileset) {
        console.log(`Creating hallway from ${format(origin)} to ${format(target)}`);

        for(let i = 1; i < length; i++) {
            const floorPosition = math2d.add(origin, math2d.mul(direction, i));
            const wall1Direction = math2d.rotateCcw(direction);
            const wall2Direction = math2d.rotateCw(direction);
            const wall1Position = math2d.add(floorPosition, wall1Direction);
            const wall2Position = math2d.add(floorPosition, wall2Direction);

            level.placeFloor(floorPosition, tileset);
            level.placeWall(wall1Position, ruleTileName, tileset);
            level.placeWall(wall2Position, ruleTileName, tileset);
        }
    }
}
