class Level {
    constructor() {
        this._rootEntity = null;
        this._grid = new Map();
        this._rooms = [];
        this._spawnPoint = null;
    }

    /**
     * @param {GameEntity} entity
     * @param {Vector2} position
     */
    addEntity(entity, position) {
        const targetIsFree = this._isFree(position);

        if(!targetIsFree) {
            return;
        }

        this.moveEntity(entity, position);

        if(this._rootEntity == null) {
            this._rootEntity = entity;
        } else {
            const beforeRootEntity = this._rootEntity.prev;

            beforeRootEntity.next = entity;
            entity.prev = beforeRootEntity;

            this._rootEntity.prev = entity;
            entity.next = this._rootEntity;
        }

        BUS.__post(E.AddEntity, entity);
    }

    /**
     * @param {Room} room
     */
    pushRoom(room) {
        this._rooms.push(room);

        if(room.node.type === "start") {
            this._spawnPoint = room.asset.getSpawnPoints()[0];
        }
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
        this._grid.set(this._getPositionHash(entity.position), entity);
    }

    /**
     * @param {GameEntity} entity
     * @param {Vector2} position
     */
    moveEntity(entity, position) {
        const targetIsFree = this._isFree(position);

        if(!targetIsFree) {
            return;
        }

        this._grid.delete(this._getPositionHash(entity.position));
        entity.position = position;
        this._grid.set(this._getPositionHash(position), entity);
    }

    tick() {
        if(this._rootEntity == null) {
            return;
        }

        let current = this._rootEntity;
        current.tick();
        current = current.next;

        while(current !== this._rootEntity) {
            current.tick();
            current = current.next;
        }
    }

    respawnPlayer() {
        const player = G.defs.create("player");

        G.player = player;
        this.addEntity(G.player, this._spawnPoint);
    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     * @private
     */
    _isFree(position) {
        const index = this._getPositionHash(position);
        return !this._grid.has(index);
    }

    /**
     * @param {Vector2} position
     * @returns {string}
     * @private
     */
    _getPositionHash(position) {
        return `${position.x},${position.y}`;
    }
}
