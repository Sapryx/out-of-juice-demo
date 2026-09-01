class InteractAction extends TurnAction {
    constructor(actor, target) {
        super(actor);
        this.target = target;
    }

    canStart(context) {
        return this.target != null && this.actor.canInteractWith(this.target);
    }

    start(context) {
        super.start(context);
        this.target.interactWith(this.actor);
        this.complete();
    }
}
