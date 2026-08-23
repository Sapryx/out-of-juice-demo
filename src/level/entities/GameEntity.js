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

    onTurnStart() {

    }

    /**
     * @param {Vector2} position
     * @returns {boolean}
     */
    moveTo(position) {
        return G.level.moveEntity(this, position);
    }

    /**
     * @param {Vector2} offset
     * @returns {boolean}
     */
    moveBy(offset) {
        return this.moveTo(math2d.add(this.position, offset));
    }
}
