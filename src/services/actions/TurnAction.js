class TurnAction {
    constructor(actor) {
        this.actor = actor;
        this._completed = false;
        this._started = false;
    }

    get blocksTurn() {
        return false;
    }

    canStart(context) {
        return true;
    }

    start(context) {
        this._started = true;
    }

    get isComplete() {
        return this._completed;
    }

    complete() {
        if(this._completed) {
            return;
        }

        this._completed = true;
    }
}
