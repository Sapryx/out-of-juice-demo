class EntityViewManager {
    constructor() {
        this.__views = new Map();
    }

    /**
     * @param {GameEntity} entity
     */
    get(entity) {
        return this.__views.get(entity);
    }

    /**
     * @param {GameEntity} entity
     */
    add(entity) {
        const view = EntityViews.get(entity);
        this.__views.set(entity, scene.__addChildBox(view));
    }
}
