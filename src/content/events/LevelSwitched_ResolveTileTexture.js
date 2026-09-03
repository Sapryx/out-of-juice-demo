BUS.__addEventListener(E.LevelSwitched, (type, level) => {
    G.gameView.reset();
    G.entityViews.cleanup();

    fillBackground(level);
    drawTiles(level);

    G.gameView.levelView.bakeTiles();
});

function fillBackground(level) {
    const xStart = level.bounds.left - G.config.cameraPadding;
    const xEnd = level.bounds.right + G.config.cameraPadding;
    const yStart = level.bounds.bottom - G.config.cameraPadding;
    const yEnd = level.bounds.top + G.config.cameraPadding;

    for(let y = yStart; y < yEnd; y++) {
        for(let x = xStart; x < xEnd; x++) {
            const position = new Vector2(x, y);
            const node = new ENode();
            node.__size = [G.config.tileSize, G.config.tileSize];
            node.__ofs = math2d.flipY(math2d.mul(position, G.config.tileSize));

            level.tileset.applyToNode(node, 4, 2);
            G.gameView.levelView.addBakedNode(node);
        }
    }
}

function drawTiles(level) {
    for(const tile of level.getTiles()) {
        const tileNode = new Node();
        tileNode.__img = "white";
        tileNode.__size = [G.config.tileSize, G.config.tileSize];
        tileNode.__ofs = math2d.flipY(math2d.mul(tile.position, G.config.tileSize));
        tileNode.__color = 0xFFFFFF;
        tileNode.__text = null;

        if(level.tileset && tile.textureOffset) {
            level.tileset.applyToNode(
                tileNode,
                tile.textureOffset.x,
                tile.textureOffset.y
            );
        }

        G.gameView.levelView.addBakedNode(tileNode);
    }
}
