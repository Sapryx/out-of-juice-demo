const EntityViewPrefabs = {
    __entityViews: new Map([
        [Player, "entities/player"],
        [Sweeper, "entities/sweeper"],
        [ItemEntity, "entities/item_entity"],
        [ExitEntity, "entities/exit_entity"],
    ]),

    /**
     * @param {GameEntity} entity
     */
    get(entity) {
        return this.__entityViews.get(entity.constructor);
    }
};
