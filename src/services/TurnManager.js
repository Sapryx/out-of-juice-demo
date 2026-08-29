class TurnManager {
    constructor() {
        this._currentEntity = null;
        this.playerHasActed = false;
    }

    get isPlayerTurn() {
        return G.player != null && this._currentEntity === G.player;
    }

    setEntity(entity) {
        this._currentEntity = entity;
    }

    tick() {
        const entity = this._currentEntity;
        const readyToAdvance = entity.isIdle || entity.isMoving;

        if(!readyToAdvance) {
            return;
        }

        if(!this.isPlayerTurn) {
            this.commitTurn();
            return;
        }

        if(this.playerHasActed) {
            this.playerHasActed = false;
            this.commitTurn();
        }
    }

    commitTurn() {
        this._currentEntity = this._currentEntity.next;
        this._currentEntity.resolveTurn();
    }
}
