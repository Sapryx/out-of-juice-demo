class EntityViewManager {
    constructor() {
        this._views = new Map();
    }

    get(entity) {
        return this._views.get(entity);
    }

    add(entity) {
        const viewPrefab = EntityViewPrefabs.get(entity);
        const view = new EntityView(viewPrefab);

        view.init();
        view.position = math2d.flipY(entity.position);
        view.node.__z = SortingOrder.getForEntity(entity);

        this._views.set(entity, view);
    }

    remove(entity) {
        const view = this._views.get(entity);

        if(!view) {
            throw new Error(`Cannot remove view for entity "${entity}": view not found`);
        }

        view.remove();
        this._views.delete(entity);
    }

    cleanup() {
        for(let view in this._views.values()) {
            view.remove();
        }

        this._views.clear();
    }
}
