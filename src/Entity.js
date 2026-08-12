class Entity {
    constructor() {
        this.__pos = new Vector2(0, 0);
        this.next = this;
        this.prev = this;
    }

    get pos() {
        return this.__pos;
    }

    tick() {

    }

    moveHorizontal(direction) {
        this.__pos.x += direction;
    }

    moveVertical(direction) {
        this.__pos.y += direction;
    }
}
