class MoveTowardsAction extends TurnAction {
    constructor(actor, targetPosition) {
        super(actor);
        this.targetPosition = math2d.copy(targetPosition);
    }

    start() {
        super.start();

        const vectorToTarget = math2d.sub(this.targetPosition, this.actor.position);
        const offset = new Vector2(0, 0);
        const altOffset = new Vector2(0, 0);

        const xLength = abs(vectorToTarget.x);
        const yLength = abs(vectorToTarget.y);
        const xDirection = sign(vectorToTarget.x);
        const yDirection = sign(vectorToTarget.y);

        if(xLength > yLength) {
            offset.x = xDirection;
            altOffset.y = yDirection;
        } else {
            offset.y = yDirection;
            altOffset.x = xDirection;
        }

        if(this.actor.moveBy(offset)) {
            return;
        }

        this.actor.moveBy(altOffset);
    }
}
