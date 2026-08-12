class EntityViews {
    constructor() {
        this.__views = {};
    }

    get(entity) {
        return this.__views[entity];
    }

    add(entity) {
        this.__views[entity] = scene.__addChildBox(Prototypes.Player);
    }
}
