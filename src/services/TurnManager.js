class TurnManager {
    constructor() {
        this._currentEntity = null;
        this.playerHasActed = false;
        this._actionStarted = false;
    }

    get isPlayerTurn() {
        return G.player != null && this._currentEntity === G.player;
    }

    setEntity(entity) {
        this._currentEntity = entity;
        this._actionStarted = false;
        this.playerHasActed = false;
    }

    tick() {
        const entity = this._currentEntity;

        if(!entity == null) {
            return;
        }

        if(this.isPlayerTurn) {
            this._tickPlayer();
        } else {
            this._tickEnemy(entity);
        }
    }

    _tickPlayer() {
        if(G.player.isAttacking) {
            return;
        }

        if(this.playerHasActed) {
            this.playerHasActed = false;
            this._advance();
        }
    }

    _tickEnemy(entity) {
        if(!this._actionStarted) {
            if(entity.canAttack(G.player) && !G.player.isIdle) {
                return;
            }

            entity.resolveTurn();
            this._actionStarted = true;

            if(entity.isAttacking) {
                return;
            }

            this._advance();
            return;
        }

        if(entity.isAttacking) {
            return;
        }

        this._advance();
    }

    _advance() {
        this._currentEntity = this._currentEntity.next;
        this._actionStarted = false;
    }
}
