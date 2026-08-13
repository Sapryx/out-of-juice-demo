const EntityViews = {
    __entityViews: new Map([
        [Player, "entities/player"],
        [Sweeper, "entities/sweeper"]
    ]),

    /**
     * @param {GameEntity} entity
     */
    get(entity) {
        return this.__entityViews.get(entity.constructor);
    }
};
