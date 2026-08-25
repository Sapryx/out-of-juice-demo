class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);
        this._state = EntityState.Idle;
        this._health = config.maxHealth;
        this._maxHealth = config.maxHealth;
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

    /**
     * @param {number} value
     */
    damage(value) {
        this._health = mmax(0, this._health - value);
    }

    /**
     * @param {() => void} onResolved
     */
    resolveTurn(onResolved) {

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

        return distanceX <= 1 && distanceY <= 1;
    }

    /**
     * @param {GameEntity} target
     */
    attack(target) {
        this._state = EntityState.Attacking;
        this.damage(10);

        G.presenter.onEntityAttack(this, target, () => this._state = EntityState.Idle);
    }

    /**
     * @param {Vector2} position
     * @param {() => void} callback
     * @returns {boolean}
     */
    moveTo(position, callback) {
        const isMoving = G.level.moveEntity(this, position, () => {
            this._state = EntityState.Idle;

            if(callback !== undefined) {
                callback();
            }
        });

        if(isMoving) {
            this._state = EntityState.Moving;
        }

        return isMoving;
    }

    /**
     * @param {Vector2} offset
     * @param {() => void} callback
     * @returns {boolean}
     */
    moveBy(offset, callback) {
        return this.moveTo(math2d.add(this.position, offset), callback);
    }
}
