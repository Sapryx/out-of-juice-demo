class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this._health = 30;
    }

    resolveTurn(onResolved) {
        super.resolveTurn(onResolved);

        const player = G.player;

        if(player == null) {
            return;
        }

        if(this.canAttack(G.player)) {
            this.attack(G.player);
            onResolved();
            return;
        }

        if(!this.moveTowards(G.player.position, onResolved)) {
            onResolved();
        }
    }
}
