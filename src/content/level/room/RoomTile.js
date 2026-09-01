class RoomTile {
    constructor() {
        this.position = new Vector2(0, 0);
        this.data = null;
        this.textureOffset = null;
        this.ruleTileName = null;
    }

    get isWall() {
        const hasRuleTile = this.ruleTileName != null;
        const hasLegacyWallTexture = this.textureOffset != null
            && !math2d.equal(this.textureOffset, new Vector2(1, 1));

        return this.data == null && (hasRuleTile || hasLegacyWallTexture);
    }
}
