class Level {
    constructor() {
        this._rootEntity = null;
        this._entityGrid = new Map();
        this._colliders = new Set();
        this._rooms = [];
        this._tiles = new Map();
        this._playerSpawnPoint = null;
        this._tileset = null;
        this._bounds = new RectBounds();
    }

    get bounds() {
        return this._bounds;
    }

    initRooms() {
        for(const room of this._rooms) {
            room.init();
        }
    }

    getTiles() {
        return [...this._tiles.values()];
    }

    addRoom(room) {
        this._rooms.push(room);

        if(!this._tileset) {
            this._tileset = room.asset.tileset;
        }

        if(room.node.type === RoomType.Start) {
            this._playerSpawnPoint = room.getSpawnPoints().find(it => it.def === "player");
        }

        for(const tile of room.getTiles()) {
            const tileGlobalPosition = math2d.add(tile.position, room.position);
            this._placeTile({
                position: tileGlobalPosition,
                textureOffset: tile.textureOffset,
                ruleTileName: tile.ruleTileName,
                tileset: room.asset.tileset
            });

            if(tile.isWall) {
                this._colliders.add(math2d.getHash(tileGlobalPosition));
            }
        }

        G.presenter.onAddRoom(room);
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

        G.presenter.onPlaceWall(position);
    }

    placeFloor(position, tileset) {
        this._placeTile({
            position: math2d.copy(position),
            textureOffset: new Vector2(1, 1),
            ruleTileName: null,
            tileset
        });

        G.presenter.onPlaceFloor(this, position);
    }

    resolveRuleTiles() {
        for(const tile of this._tiles.values()) {
            if(tile.ruleTileName == null) {
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

        this.moveEntity(entity, position, undefined);
        G.presenter.onAddEntity(entity);
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

        G.presenter.onRemoveEntity(entity);
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

        G.presenter.onEntityMoved(entity, callback);

        return true;
    }

    respawnPlayer() {
        const player = G.defs.create("player");

        G.player = player;
        this.addEntity(G.player, this._playerSpawnPoint.position);
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
