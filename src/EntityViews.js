class EntityViews {
    constructor() {
        this.__views = {};
    }

    get(entity) {
        return this.__views[entity];
    }

    add(entity) {
        const prototype = Prototypes.get(entity);
        this.__views[entity] = scene.__addChildBox(prototype);
    }
}
