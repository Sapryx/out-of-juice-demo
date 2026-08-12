class Level {
    constructor() {
        this.rootEntity = null;
    }

    addEntity(entity) {
        BUS.__post(E.AddEntity, entity);

        if(this.rootEntity == null) {
            this.rootEntity = entity;
            return;
        }

        const beforeRootEntity = this.rootEntity.prev;

        beforeRootEntity.next = entity;
        entity.prev = beforeRootEntity;

        this.rootEntity.prev = entity;
        entity.next = this.rootEntity;
    }

    removeEntity(entity) {
        const entityIsLast = entity.next === entity;

        if(entity === this.rootEntity) {
            this.rootEntity = entityIsLast ? null : entity.next;
        }

        if(entityIsLast) {
            const nextEntity = entity.next;
            const prevEntity = entity.prev;
            nextEntity.prev = prevEntity;
            prevEntity.next = nextEntity;
        }

        entity.next = null;
        entity.prev = null;
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
