class MoveAction extends TurnAction {
    constructor(actor, targetPosition) {
        super(actor);
        this.targetPosition = math2d.copy(targetPosition);
    }

    start(context) {
        super.start(context);
        this.actor.moveTo(this.targetPosition);
    }
}
