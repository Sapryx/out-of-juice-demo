class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);

        this.takeDamageSfx = null;
        this.dealDamageSfx = null;
        this.isHostile = true;

        this._state = EntityState.Idle;
        this._health = config.maxHealth;
        this._maxHealth = config.maxHealth;
        this._damage = config.damage ? config.damage : 10;
        this._interactionRange = 1;
    }

    get health() {
        return this._health;
    }

    get maxHealth() {
        return this._maxHealth;
    }

    get isAttacking() {
        return this._state === EntityState.Attacking;
    }

    get isIdle() {
        return this._state === EntityState.Idle;
    }

    get isMoving() {
        return this._state === EntityState.Moving;
    }

    getTurnAction() {
        return null;
    }

    getInteractionAction(actor) {
        return null;
    }

    canInteractWith(target) {
        if(target === this) {
            return false;
        }

        return math2d.chebyshevDistance(target.position, this.position) <= this._interactionRange;
    }

    attack(target, onHitTarget, onComplete) {
        this._state = EntityState.Attacking;
        const randomizedDamage = this._damage * (1 + randomFloatSpread(G.config.damageDeviation * 2));
        const finalDamage = mmax(round(randomizedDamage), 0);

        BUS.__post(
            E.EntityAttacked,
            this,
            target,
            onHitTarget || (() => target.dealDamage(finalDamage)),
            () => {
                this._state = EntityState.Idle;

                if(onComplete) {
                    onComplete();
                }
            }
        );
    }

    dealDamage(amount) {
        if(amount < 0) {
            throw new Error(`Damage amount cannot be negative (was "${amount}")`);
        }

        this._health = mmax(0, this._health - amount);
        BUS.__post(E.EntityHurt, this, amount);

        if(this._health === 0) {
            this._die();
        }
    }

    heal(amount) {
        if(amount < 0) {
            throw new Error(`Heal amount cannot be negative (was "${amount}")`);
        }

        if(this._health === this._maxHealth) {
            return false;
        }

        this._health = mmin(this._health + amount, this._maxHealth);
        BUS.__post(E.EntityHealed, this);
        return true;
    }

    moveTo(position) {
        if(!G.level.isTileFree(position)) {
            return false;
        }

        this._state = EntityState.Moving;

        G.level.moveEntity(this, position, () => {
            this._state = EntityState.Idle;
        });

        return true;
    }

    moveBy(offset) {
        return this.moveTo(math2d.add(this.position, offset));
    }

    interactWith(actor) {

    }

    _die() {
        G.level.removeEntity(this);
    }
}
