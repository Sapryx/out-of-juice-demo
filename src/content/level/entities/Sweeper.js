class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this._health = 30;
    }

    resolveTurn() {
        super.resolveTurn();
        const player = G.player;

        if(player == null) {
            return;
        }

        if(this.canAttack(player)) {
            this.attack(player);
        } else {
            this.moveTowards(player.position);
        }
    }
}
