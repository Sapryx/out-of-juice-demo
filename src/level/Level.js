class Level {
    constructor() {
        this.rootEntity = null;
        this.grid = new Map();
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

        if(this.rootEntity == null) {
            this.rootEntity = entity;
        } else {
            const beforeRootEntity = this.rootEntity.prev;

            beforeRootEntity.next = entity;
            entity.prev = beforeRootEntity;

            this.rootEntity.prev = entity;
            entity.next = this.rootEntity;
        }

        BUS.__post(E.AddEntity, entity);
        console.log(this.grid);
    }

    /**
     * @param {GameEntity} entity
     */
    removeEntity(entity) {
        const entityIsLast = entity.next === entity;

        if(entity === this.rootEntity) {
            this.rootEntity = entityIsLast ? null : entity.next;
        }

        if(!entityIsLast) {
            const nextEntity = entity.next;
            const prevEntity = entity.prev;
            nextEntity.prev = prevEntity;
            prevEntity.next = nextEntity;
        }

        entity.next = null;
        entity.prev = null;
        this.grid.set(entity.position.y + 100 * entity.position.x, entity);
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

        this.grid.delete(entity.position.y + 100 * entity.position.x);
        entity.position = position;
        this.grid.set(position.y + 100 * position.x, entity);
    }

    tick() {
        if(this.rootEntity == null) {
            return;
        }

        let current = this.rootEntity;
        current.tick();
        current = current.next;

        while(current !== this.rootEntity) {
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
        return !this.grid.has(position.y + 100 * position.x);
    }
}
