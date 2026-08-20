class RoomTile {
    constructor() {
        this.position = new Vector2(0, 0);
        this.data = null;
        this.textureOffset = null;
    }

    get isWall() {
        return this.data == null && this.textureOffset != null;
    }
}
