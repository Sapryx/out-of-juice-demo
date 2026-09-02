BUS.__addEventListener(E.LevelRender, (type, level) => {
    for(const tile of level.getTiles()) {
        const tileNode = new Node();
        tileNode.__img = "white";
        tileNode.__size = [G.config.tileSize, G.config.tileSize];
        tileNode.__ofs = math2d.flipY(math2d.mul(tile.position, G.config.tileSize));
        tileNode.__color = 0xFFFFFF;
        tileNode.__text = null;

        if(tile.tileset != null && tile.textureOffset != null) {
            tile.tileset.applyToNode(
                tileNode,
                tile.textureOffset.x,
                tile.textureOffset.y
            );
        }

        G.gameView.levelView.addBakedNode(tileNode);
    }
});
