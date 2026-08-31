class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.takeDamageSfx = SFX.HitMetal;
        this.dealDamageSfx = SFX.Burn;
    }

    interactWith() {
        G.player.attack(this);
    }

    resolveTurn() {
        if(G.player != null && this.canInteractWith(G.player)) {
            this.attack(G.player);
            return;
        }

        if(G.player != null) {
            this.moveTowards(G.player.position);
        }
    }
}
