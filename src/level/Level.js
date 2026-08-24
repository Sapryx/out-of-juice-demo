class Level {
    constructor() {
        this._rootEntity = null;
        this._entityGrid = new Map();
        this._colliders = new Set();
        this._rooms = [];
        this._playerSpawnPoint = null;
    }

    initRooms() {
        for(const room of this._rooms) {
            room.init();
        }
    }

    /**
     * @param {GameEntity} entity
     * @param {Vector2} position
     */
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

        G.presenter.onAddEntity(entity);

        this.moveEntity(entity, position, undefined);
    }

    /**
     * @returns {Array<Room>}
     */
    getRooms() {
        return this._rooms;
    }

    /**
     * @param {Room} room
     */
    addRoom(room) {
        this._rooms.push(room);

        if(room.node.type === "start") {
            this._playerSpawnPoint = room.asset.getSpawnPoints().find(it => it.def === "player");
        }

        for(const tile of room.asset.getTiles().filter(tile => tile.isWall)) {
            const tileGlobalPosition = math2d.add(tile.position, room.position);
            this._colliders.add(this._getHash(tileGlobalPosition));
        }

        G.presenter.onAddRoom(room);
    }

    /**
     * @param {Vector2} position
     */
    placeWall(position) {
        const positionHash = this._getHash(position);
        this._colliders.add(positionHash);

        G.presenter.onAddWall(position);
    }

    /**
     * @param {GameEntity} entity
     */
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
        this._entityGrid.delete(this._getHash(entity.position));
    }

    /**
     * @param {GameEntity} entity
     * @param {Vector2} targetPosition
     * @param {() => void} callback
     * @returns {boolean}
     */
    moveEntity(entity, targetPosition, callback) {
        if(!this.isTileFree(targetPosition)) {
            return false;
        }

        const currentPositionHash = this._getHash(entity.position);
        const targetPositionHash = this._getHash(targetPosition);

        entity.position = targetPosition;
        this._entityGrid.delete(currentPositionHash);
        this._entityGrid.set(targetPositionHash, entity);

        G.presenter.onMoveEntity(entity, callback);

        return true;
    }

    respawnPlayer() {
        const player = G.defs.create("player");

        G.player = player;
        this.addEntity(G.player, this._playerSpawnPoint.position);
    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     */
    isTileFree(position) {
        return !this.isTileCollider(position) && !this.isEntityInTile(position);
    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     */
    isEntityInTile(position) {
        return this.getEntityInTile(position) !== undefined;
    }

    /**
     *
     * @param {Vector2} position
     * @returns {GameEntity | undefined}
     */
    getEntityInTile(position) {
        const positionHash = this._getHash(position);
        return this._entityGrid.get(positionHash);
    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     */
    isTileCollider(position) {
        const positionHash = this._getHash(position);
        return this._colliders.has(positionHash);
    }

    /**
     * @param {Vector2} position
     * @returns {string}
     * @private
     */
    _getHash(position) {
        return `${position.x},${position.y}`;
    }
}
