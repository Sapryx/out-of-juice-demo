class Sweeper extends GameEntity {
    constructor(config) {
        super(config);

        this.canMove = true;
    }

    tick() {
        super.tick();

        if(!this.canMove) {
            return;
        }

        if(G.player == null) {
            return;
        }

        if(G.turnManager.isPlayerTurn) {
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

        _setTimeout(() => {
            G.turnManager.isPlayerTurn = true;
            this.canMove = true;
        }, G.config.tilePassTime);
    }
}
