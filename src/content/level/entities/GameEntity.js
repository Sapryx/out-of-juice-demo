class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);
        this._state = EntityState.Idle;
        this._health = config.maxHealth;
        this._maxHealth = config.maxHealth;
        this._attackDistance = 1;
    }

    /**
     * @returns {float}
     */
    get health() {
        return this._health;
    }

    /**
     * @returns {float}
     */
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

    resolveTurn() {

    }

    /**
     * @param {GameEntity} target
     */
    canAttack(target) {
        if(target === this) {
            return false;
        }

        const vectorToTarget = math2d.sub(target.position, this.position);
        const distanceX = abs(vectorToTarget.x);
        const distanceY = abs(vectorToTarget.y);

        return distanceX <= this._attackDistance && distanceY <= this._attackDistance;
    }

    /**
     * @param {GameEntity} target
     */
    attack(target) {
        this._state = EntityState.Attacking;
        target.dealDamage(10);

        G.presenter.onEntityAttack(this, target, () => {
            this._state = EntityState.Idle;
        });
    }

    /**
     * @param {number} amount
     */
    dealDamage(amount) {
        this._health = mmax(0, this._health - amount);

        if(this._health === 0) {
            this._die();
        }
    }

    /**
     * @param {number} amount
     * @returns {boolean}
     */
    heal(amount) {
        if(amount < 0) {
            throw new Error(`Heal amount cannot be negative (was "${amount}")`);
        }

        if(this._health === this._maxHealth) {
            return false;
        }

        this._health = mmin(this._health + amount, this._maxHealth);
        return true;
    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     */
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

    /**
     * @param {Vector2} offset
     * @returns {boolean}
     */
    moveBy(offset) {
        return this.moveTo(math2d.add(this.position, offset));
    }

    /**
     * @param {Vector2} position
     */
    moveTowards(position) {
        const vectorToTarget = math2d.sub(position, this.position);
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

        return this.moveBy(offset) || this.moveBy(altOffset);
    }

    _die() {
        G.level.removeEntity(this);
    }
}
