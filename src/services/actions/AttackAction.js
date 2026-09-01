class AttackAction extends TurnAction {
    constructor(actor, target) {
        super(actor);
        this.target = target;
    }

    get blocksTurn() {
        return true;
    }

    canStart() {
        return this.target != null
            && this.actor.canInteractWith(this.target)
            && this.target.isIdle;
    }

    start() {
        super.start();
        this.actor.attack(this.target, undefined, () => this.complete());
    }
}
