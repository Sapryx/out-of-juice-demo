class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.takeDamageSfx = SFX.HitMetal;
        this.dealDamageSfx = SFX.Burn;
        this._detectionRange = config.detectionRange;
    }

    getInteractionAction(actor) {
        return new AttackAction(actor, this);
    }

    getTurnAction() {
        if(!G.player) {
            return null;
        }

        const distanceToPlayer = math2d.chebyshevDistance(G.player.position, this.position);

        if(distanceToPlayer > this._detectionRange) {
            return null;
        }

        if(this.canInteractWith(G.player)) {
            return new AttackAction(this, G.player);
        } else {
            return new MoveTowardsAction(this, G.player.position);
        }
    }
}
