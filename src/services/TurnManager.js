class TurnManager {
    constructor() {
        this._currentEntity = null;
        this._currentAction = null;
    }

    get isPlayerTurn() {
        return G.player && this._currentEntity === G.player;
    }

    setEntity(entity) {
        this._currentEntity = entity;
        this._currentAction = null;
    }

    submit(action) {
        if(!action || action.actor !== this._currentEntity) {
            return false;
        }

        if(this._currentAction || !action.canStart()) {
            return false;
        }

        action.start();

        if(!action.blocksTurn || action.isComplete) {
            this._advance();
        } else {
            this._currentAction = action;
        }

        return true;
    }

    tick() {
        if(!this._currentEntity) {
            return;
        }

        if(this._currentAction) {
            if(this._currentAction.isComplete) {
                this._currentAction = null;
                this._advance();
            }

            return;
        }

        while(this._currentEntity && !this.isPlayerTurn) {
            const action = this._currentEntity.getTurnAction();

            if(!action) {
                this._advance();
                continue;
            }

            const submitted = this.submit(action);

            if(!submitted) {
                return;
            }

            if(this._currentAction) {
                return;
            }
        }
    }

    _advance() {
        this._currentAction = null;

        if(!this._currentEntity) {
            return;
        }

        this._currentEntity = this._currentEntity.next;
    }
}
