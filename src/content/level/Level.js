class Level {
    constructor() {
        this.tileset = null;
        this._rootEntity = null;
        this._entityGrid = new Map();
        this._colliders = new Set();
        this._rooms = [];
        this._tiles = new Map();
        this._playerSpawnPoint = null;
        this._bounds = new RectBounds();
    }

    get bounds() {
        return this._bounds;
    }

    spawnEntities() {
        for(const room of this._rooms) {
            for(const spawnPoint of room.getSpawnPoints()) {
                if(spawnPoint.def === "player") {
                    continue;
                }

                const entity = G.defs.create(spawnPoint.def);
                const globalPosition = math2d.add(room.position, spawnPoint.position);

                this.addEntity(entity, globalPosition);

                if(entity instanceof ItemEntity) {
                    const itemAsset = G.itemAssets.get(spawnPoint.item);
                    entity.setItem(new Item(itemAsset));
                }
            }
        }
    }

    getTiles() {
        return [...this._tiles.values()];
    }

    addRoom(room) {
        this._rooms.push(room);

        if(!this.tileset) {
            this.tileset = room.asset.tileset;
        }

        if(room.node.type === RoomType.Start || room.node.type === RoomType.Juice) {
            this._playerSpawnPoint = room.getSpawnPoints().find(it => it.def === "player");
        }

        for(const tile of room.getTiles()) {
            const tileGlobalPosition = math2d.add(tile.position, room.position);
            this._placeTile({
                position: tileGlobalPosition,
                textureOffset: tile.textureOffset,
                ruleTileName: tile.ruleTileName,
                tileset: this.tileset
            });

            if(tile.isWall) {
                this._colliders.add(math2d.getHash(tileGlobalPosition));
            }
        }

    }

    doesRoomOverlap(room, position) {
        for(const tile of room.getTiles()) {
            const globalPosition = math2d.add(tile.position, position);
            const positionHash = math2d.getHash(globalPosition);

            if(this._tiles.has(positionHash)) {
                return true;
            }
        }

        return false;
    }

    placeWall(position, ruleTileName, tileset) {
        if(ruleTileName == null) {
            throw new Error(`Cannot place wall at ${format(position)} without a Rule Tile`);
        }

        const positionHash = math2d.getHash(position);
        this._colliders.add(positionHash);
        this._placeTile({
            position: math2d.copy(position),
            textureOffset: null,
            ruleTileName,
            tileset
        });

    }

    placeFloor(position, tileset) {
        this._placeTile({
            position: math2d.copy(position),
            textureOffset: new Vector2(1, 1),
            ruleTileName: null,
            tileset
        });

    }

    resolveRuleTiles() {
        for(const tile of this._tiles.values()) {
            if(!tile.ruleTileName) {
                continue;
            }

            const ruleTile = G.ruleTiles.get(tile.ruleTileName);
            tile.textureOffset = ruleTile.resolve(this._tiles, tile.position);
        }
    }

    _placeTile(tile) {
        const positionHash = math2d.getHash(tile.position);
        this._tiles.set(positionHash, tile);
    }

    isEntityInTile(position) {
        return this.getEntityInTile(position) !== undefined;
    }

    getEntityInTile(position) {
        const positionHash = math2d.getHash(position);
        return this._entityGrid.get(positionHash);
    }

    addEntity(entity, position) {
        if(!this.isTileFree(position)) {
            return;
        }

        if(this._rootEntity == null) {
            this._rootEntity = entity;
        } else {
            const beforeRootEntity = this._rootEntity.prev;

            beforeRootEntity.next = entity;
            entity.prev = beforeRootEntity;

            this._rootEntity.prev = entity;
            entity.next = this._rootEntity;
        }

        entity.level = this;
        this.moveEntity(entity, position, undefined);
        BUS.__post(E.EntityAdded, entity);
    }

    removeEntity(entity) {
        const entityIsLast = entity.next === entity;

        if(entity === this._rootEntity) {
            this._rootEntity = entityIsLast ? null : entity.next;
        }

        if(!entityIsLast) {
            const nextEntity = entity.next;
            const prevEntity = entity.prev;
            nextEntity.prev = prevEntity;
            prevEntity.next = nextEntity;
        }

        entity.next = null;
        entity.prev = null;
        this._entityGrid.delete(math2d.getHash(entity.position));

        BUS.__post(E.EntityRemoved, entity);
    }

    moveEntity(entity, targetPosition, callback) {
        if(!this.isTileFree(targetPosition)) {
            return false;
        }

        const currentPositionHash = math2d.getHash(entity.position);
        const targetPositionHash = math2d.getHash(targetPosition);

        entity.position = targetPosition;
        this._entityGrid.delete(currentPositionHash);
        this._entityGrid.set(targetPositionHash, entity);

        BUS.__post(E.EntityMoved, entity, callback);

        return true;
    }

    addPlayer(player) {
        this.addEntity(player, this._playerSpawnPoint.position);
    }

    isTileFree(position) {
        return !this.isTileCollider(position) && !this.isEntityInTile(position);
    }

    isTileCollider(position) {
        const positionHash = math2d.getHash(position);
        return this._colliders.has(positionHash);
    }

    recalculateBounds() {
        for(const tile of this._tiles.values()) {
            const x = tile.position.x;
            const y = tile.position.y;

            this._bounds.left = mmin(this._bounds.left, x);
            this._bounds.right = mmax(this._bounds.right, x);
            this._bounds.bottom = mmin(this._bounds.bottom, y);
            this._bounds.top = mmax(this._bounds.top, y);
        }
    }
}
