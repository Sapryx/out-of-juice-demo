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
        this.grid.set(position, entity);
        entity.position = position;

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
        this.grid.set(entity.position, entity);
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
}
