class TurnManager {
    constructor() {
        this.currentEntity = null;
        this.turnIsInProgress = false;
    }

    get isPlayerTurn() {
        return this.currentEntity != null && this.currentEntity === G.player;
    }

    setEntity(entity) {
        this.currentEntity = entity;
    }

    tick() {
        if(this.turnIsInProgress) {
            return;
        }

        this.currentEntity.onTurnStart();
        this.turnIsInProgress = true;
    }

    commitTurn() {
        this.currentEntity = this.currentEntity.next;
        this.turnIsInProgress = false;
    }
}
