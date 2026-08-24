BUS.__addEventListener(E.AddWall, (type, position) => {
    const tileNode = new Node();
    tileNode.__img = "white";
    tileNode.__size = [G.config.tileSize, G.config.tileSize];

    tileNode.__ofs = math2d.flipY(math2d.mul(position, G.config.tileSize));
    tileNode.__color = 0xFF0000;
    tileNode.__text = {
        __text: `(${position.x};${position.y})`,
        __fontsize: 10
    };

    G.gameView.levelView.addBakedNode(tileNode);
});
