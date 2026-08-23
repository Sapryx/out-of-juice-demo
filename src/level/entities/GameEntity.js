class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this.position = new Vector2(0, 0);
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
     * @param {Vector2} position
     * @param {() => void} callback
     * @returns {boolean}
     */
    moveTo(position, callback) {
        return G.level.moveEntity(this, position, callback);
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
