class EntityViewManager {
    constructor() {
        this._views = new Map();
    }

    /**
     * @param {GameEntity} entity
     * @returns {EntityView}
     */
    get(entity) {
        return this._views.get(entity);
    }

    /**
     * @param {GameEntity} entity
     */
    add(entity) {
        const viewPrefab = EntityViewPrefabs.get(entity);
        const view = new EntityView(viewPrefab);

        view.init();
        view.position = math2d.flipY(entity.position);

        this._views.set(entity, view);
    }
}
