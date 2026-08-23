class Sweeper extends GameEntity {
    constructor(config) {
        super(config);
        this.canMove = true;
    }

    onTurnStart() {
        super.onTurnStart();

        if(!this.canMove || G.player == null) {
            return;
        }

        const vectorToTarget = math2d.sub(G.player.position, this.position);
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

        if(!this.moveBy(offset)) {
            this.moveBy(altOffset);
        }

        this.canMove = false;
        console.log("sweep!");

        _setTimeout(() => {
            G.turnManager.commitTurn();
            this.canMove = true;
        }, G.config.tilePassTime);
    }
}
