class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);
        this.state = EntityState.Idle;
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

    /**
     * @param {float} value
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
        const vectorToTarget = math2d.sub(target.position, this.position);
        const distanceX = abs(vectorToTarget.x);
        const distanceY = abs(vectorToTarget.y);

        return distanceX <= 1 && distanceY <= 1;
    }

    /**
     * @param {Vector2} position
     * @param {() => void} callback
     * @returns {boolean}
     */
    moveTo(position, callback) {
        const isMoving = G.level.moveEntity(this, position, () => {
            this.state = EntityState.Idle;

            if(callback !== undefined) {
                callback();
            }
        });

        if(isMoving) {
            this.state = EntityState.Moving;
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
