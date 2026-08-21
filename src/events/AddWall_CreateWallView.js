BUS.__addEventListener(E.AddWall, (type, position) => {
    const tileNode = new Node();
    tileNode.__img = "white";
    tileNode.__size = [G.config.tileSize, G.config.tileSize];
    tileNode.__x = position.x * G.config.tileSize;
    tileNode.__y = -position.y * G.config.tileSize;
    tileNode.__color = 0xFF0000;
    tileNode.__text = {
        __text: `(${position.x};${position.y})`,
        __fontsize: 10
    };

    G.levelView.addBakedNode(tileNode);
});
