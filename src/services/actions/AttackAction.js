class AttackAction extends TurnAction {
    constructor(actor, target) {
        super(actor);
        this.target = target;
    }

    get blocksTurn() {
        return true;
    }

    canStart(context) {
        return this.target != null
            && this.actor.canInteractWith(this.target)
            && this.target.isIdle;
    }

    start(context) {
        super.start(context);
        this.actor.attack(this.target, undefined, () => this.complete());
    }
}
