class GameEntity {
    constructor() {
        this.next = this;
        this.prev = this;
        this._position = new Vector2(0, 0);
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    tick() {

    }

    moveHorizontal(direction) {
        this._position.x += direction;
    }

    moveVertical(direction) {
        this._position.y += direction;
    }
}
