class Level {
    /**
     * @param {Vector2} size
     * @param {bool[][]} collisionMap
     */
    constructor(size, collisionMap) {
        this._rootEntity = null;
        this._grid = new Map();
        this._size = size;
        this._collisionMap = collisionMap.slice().reverse().flat();
    }

    /**
     * @returns {Vector2}
     */
    get size() {
        return this._size;
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

    /**
     * @param {Vector2} position
     * @returns {boolean}
     * @private
     */
    _isFree(position) {
        const index = this._getPositionHash(position);
        return !this._collisionMap[index] && !this._grid.has(index);
    }

    /**
     * @param {Vector2} position
     * @returns {int}
     * @private
     */
    _getPositionHash(position) {
        return position.x + this._size.x * position.y;
    }

    _debugCollision() {
        const tileSize = G.config.tileSize;

        for(let y = 0; y < this._size.y; y++) {
            for(let x = 0; x < this._size.x; x++) {
                const index = x + this._size.x * y;

                if(!this._collisionMap[index]) {
                    continue;
                }

                const tile = G.levelView.__addChildBox("collision_debug");

                tile.__color = 0xFF00FF;
                tile.__x = x * tileSize;
                tile.__y = -y * tileSize;
                tile.__width = tileSize;
                tile.__height = tileSize;
            }
        }
    }
}
