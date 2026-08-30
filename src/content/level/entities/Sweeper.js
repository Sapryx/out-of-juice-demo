class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.takeDamageSound = "hit_metal";
        this.dealDamageSound = "burn"
    }

    resolveTurn() {
        if(G.player != null && this.canAttack(G.player)) {
            this.attack(G.player);
            return;
        }

        if(G.player != null) {
            this.moveTowards(G.player.position);
        }
    }
}
