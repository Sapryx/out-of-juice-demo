class MoveAction extends TurnAction {
    constructor(actor, targetPosition) {
        super(actor);
        this.targetPosition = math2d.copy(targetPosition);
    }

    start() {
        super.start();
        this.actor.moveTo(this.targetPosition);
    }
}
