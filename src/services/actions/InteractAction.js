class InteractAction extends TurnAction {
    constructor(actor, target) {
        super(actor);
        this.target = target;
    }

    canStart() {
        return this.target && this.actor.canInteractWith(this.target);
    }

    start() {
        super.start();
        this.target.interactWith(this.actor);
        this.complete();
    }
}
