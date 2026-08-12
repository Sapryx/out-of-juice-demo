const Prototypes = {
    __prototypes: new Map([
        [Player, {
            __img: "player",
            __size: [14, 26]
        }]
    ]),

    /**
     * @param {Entity} entity
     */
    get(entity) {
        return this.__prototypes.get(entity.constructor);
    }
};
