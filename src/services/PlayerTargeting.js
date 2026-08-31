class PlayerTargeting {
    constructor() {
        this.position = null;
        this.entity = null;
    }

    update() {
        const origin = G.player.position;

        this.position = null;
        this.entity = null;

        for(let y = -1; y <= 1; y++) {
            for(let x = -1; x <= 1; x++) {
                if(x === 0 && y === 0) {
                    continue;
                }

                const offset = new Vector2(x, y);
                const currentPosition = math2d.add(origin, offset);
                const entity = G.level.getEntityInTile(currentPosition);

                if(entity) {
                    this.position = currentPosition;
                    this.entity = entity;
                }
            }
        }
    }
}
