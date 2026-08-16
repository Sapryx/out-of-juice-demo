class GameEntity {
    constructor(config) {
        this.next = this;
        this.prev = this;
        this._position = new Vector2(0, 0);
        this._health = config.maxHealth;
        this._maxHealth = config.maxHealth;
    }

    /**
     * @returns {Vector2}
     */
    get position() {
        return this._position;
    }

    /**
     * @param {Vector2} value
     */
    set position(value) {
        this._position = value;
    }

    tick() {

    }

    /**
     * @param {Vector2} position
     */
    moveTo(position) {
        G.level.moveEntity(this, position);
    }

    /**
     * @param {Vector2} offset
     */
    moveBy(offset) {
        this.moveTo(math2d.add(this.position, offset));
    }
}
