class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.takeDamageSfx = SFX.HitMetal;
        this.dealDamageSfx = SFX.Burn;
    }

    getInteractionAction(actor) {
        return new AttackAction(actor, this);
    }

    getTurnAction(context) {
        if(!context.player) {
            return null;
        }

        if(this.canInteractWith(context.player)) {
            return new AttackAction(this, context.player);
        } else {
            return new MoveTowardsAction(this, context.player.position);
        }
    }
}
