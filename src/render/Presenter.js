class Presenter {
    /**
     * @param {GameEntity} entity
     * @param {() => void} callback
     */
    onMoveEntity(entity, callback) {
        const view = G.entityViews.get(entity);
        view.animateTo(math2d.flipY(entity.position), G.config.tilePassTime)
            .__setOnComplete(callback);
    }

    /**
     * @param {GameEntity} entity
     */
    onAddEntity(entity) {
        G.entityViews.add(entity);
    }

    /**
     * @param {Room} room
     */
    onAddRoom(room) {
        for(const tile of room.asset.getTiles()) {
            const tileWorldPosition = math2d.add(room.position, tile.position);
            const tileNode = new Node();
            tileNode.__img = "white";
            tileNode.__size = [G.config.tileSize, G.config.tileSize];
            tileNode.__ofs = math2d.flipY(math2d.mul(tileWorldPosition, G.config.tileSize));
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
    }

    /**
     * @param {Vector2} position
     */
    onAddWall(position) {
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
    }
}
