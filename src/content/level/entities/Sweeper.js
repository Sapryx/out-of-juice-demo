class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.takeDamageSfx = SFX.HitMetal;
        this.dealDamageSfx = SFX.Burn;
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
