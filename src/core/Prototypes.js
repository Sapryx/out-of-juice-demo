const Prototypes = {
    __prototypes: new Map([
        [Player, "entities/player"],
        [Sweeper, "entities/sweeper"]
    ]),

    /**
     * @param {Entity} entity
     */
    get(entity) {
        return this.__prototypes.get(entity.constructor);
    }
};
