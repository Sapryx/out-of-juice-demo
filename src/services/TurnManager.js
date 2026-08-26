class TurnManager {
    constructor() {
        this._currentEntity = null;
    }

    get isPlayerTurn() {
        return G.player != null && this._currentEntity === G.player;
    }

    setEntity(entity) {
        this._currentEntity = entity;
    }

    tick() {
        if(this._currentEntity.isIdle && !this.isPlayerTurn) {
            this.commitTurn();
        }
    }

    commitTurn() {
        this._currentEntity = this._currentEntity.next;
        this._currentEntity.resolveTurn();
    }
}
