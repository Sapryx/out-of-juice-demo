class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);
        this.level = null;

        this.takeDamageSfx = null;
        this.dealDamageSfx = null;
        this.isHostile = true;

        this._state = EntityState.Idle;
        this._health = config.maxHealth;
        this._maxHealth = config.maxHealth;
        this._damage = config.damage ? config.damage : 10;
        this._interactionRange = 1;
        this.critChance = config.critChance ? config.critChance : 0;
        this.critMultiplier = config.critMultiplier ? config.critMultiplier : 1;
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

    attack(target) {
        const hitIsCritical = random() < this.critChance;
        let damage = this._damage * (1 + randomFloatSpread(G.config.damageDeviation * 2));

        if(hitIsCritical) {
            damage *= (1 + this.critMultiplier);
        }

        damage = mmax(round(damage), 0);

        this._state = EntityState.Attacking;
        BUS.__post(E.EntityAttacked, this, target, damage, hitIsCritical);
    }

    finishAttack() {
        this._state = EntityState.Idle;
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
        if(!this.level.isTileFree(position)) {
            return false;
        }

        this._state = EntityState.Moving;

        this.level.moveEntity(this, position, () => {
            this._state = EntityState.Idle;
        });

        return true;
    }

    moveBy(offset) {
        return this.moveTo(math2d.add(this.position, offset));
    }

    getInteractionName() {
        return "interact";
    }

    interactWith(actor) {

    }

    _die() {
        this.level.removeEntity(this);
    }
}
