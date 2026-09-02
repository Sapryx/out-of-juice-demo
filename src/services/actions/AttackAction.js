class AttackAction extends TurnAction {
    constructor(actor, target) {
        super(actor);
        this.target = target;
        this._onAttackFinished = this._onAttackFinished.bind(this);
    }

    get blocksTurn() {
        return true;
    }

    canStart() {
        return this.target != null
            && this.actor.canInteractWith(this.target)
            && this.target.isIdle;
    }

    start() {
        super.start();
        BUS.__addEventListener(E.EntityAttackFinished, this._onAttackFinished);
        this.actor.attack(this.target);
    }

    _onAttackFinished(type, attacker) {
        if(attacker !== this.actor) {
            return;
        }

        BUS.__removeEventListener(E.EntityAttackFinished, this._onAttackFinished);
        this.complete();
    }
}
