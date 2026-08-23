BUS.__addEventListener(E.AddRoom, (type, room) => {
    for(const tile of room.asset.getTiles()) {
        const tileNode = new Node();
        tileNode.__img = "white";
        tileNode.__size = [G.config.tileSize, G.config.tileSize];
        tileNode.__x = (room.position.x + tile.position.x) * G.config.tileSize;
        tileNode.__y = -(room.position.y + tile.position.y) * G.config.tileSize;
        tileNode.__color = 0xFF0000;
        tileNode.__text = {
            __text: `(${room.position.x + tile.position.x};${room.position.y + tile.position.y})`,
            __fontsize: 10
        };

        if(tile.data != null) {
            if(tile.data.type === "door") {
                tileNode.__color = 0x0000FF;
            } else {
                tileNode.__color = 0x00FF00;
            }
        }

        if(tile.isWall) {
            G.gameView.levelView.addBakedNode(tileNode);
        } else {
            G.gameView.levelView.addNode(tileNode);
        }
    }
});
