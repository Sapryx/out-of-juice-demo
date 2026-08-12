class EntityViewManager {
    constructor() {
        this.__views = new Map();
    }

    /**
     * @param {Entity} entity
     */
    get(entity) {
        return this.__views.get(entity);
    }

    /**
     * @param {Entity} entity
     */
    add(entity) {
        const view = EntityViews.get(entity);
        this.__views.set(entity, scene.__addChildBox(view));
    }
}
