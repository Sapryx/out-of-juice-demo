class Presenter {
    /**
     * @param {GameEntity} entity
     */
    onAddEntity(entity) {
        G.entityViews.add(entity);
    }

    onRemoveEntity(entity) {
        G.entityViews.remove(entity);
    }

    /**
     * @param {GameEntity} entity
     * @param {() => void} callback
     */
    onMoveEntity(entity, callback) {
        const view = G.entityViews.get(entity);
        const targetPosition = math2d.flipY(entity.position);
        const animationDuration = G.config.tilePassTime;
        view.node.__z = SpriteSorting.getZ(SortingLayer.Entities) + entity.position.y;

        if(entity !== G.player) {
            const playerDirection = sign(G.player.position.x - entity.position.x);

            if(playerDirection !== 0) {
                view.node.__scalex = playerDirection;
            }
        }

        Anims.walk(view.node, targetPosition, animationDuration)
            .__setOnComplete(callback);
    }

    /**
     * @param {GameEntity} attacker
     * @param {GameEntity} target
     * @param {() => void} onHitTarget
     * @param {() => void} onComplete
     */
    onEntityAttack(attacker, target, onHitTarget, onComplete) {
        const attackerView = G.entityViews.get(attacker);
        const targetPosition = math2d.flipY(target.position);
        const startPosition = math2d.flipY(attacker.position);

        if(attackerView !== undefined) {
            Anims.attack(
                attackerView.node,
                startPosition,
                targetPosition,
                0.25,
                onHitTarget,
                onComplete
            );
        }
    }

    /**
     * @param {GameEntity} entity
     */
    onEntityHurt(entity) {
        const view = G.entityViews.get(entity);

        Anims.hurt(view.node, 0.1);
    }

    /**
     * @param {Room} room
     */
    onAddRoom(room) {
        const tileset = room.asset.tileset;

        for(const tile of room.asset.getTiles()) {
            const tileWorldPosition = math2d.add(room.position, tile.position);
            const tileNode = new Node();
            tileNode.__img = "white";
            tileNode.__size = [G.config.tileSize, G.config.tileSize];
            tileNode.__ofs = math2d.flipY(math2d.mul(tileWorldPosition, G.config.tileSize));
            tileNode.__color = 0xFFFFFF;
            tileNode.__text = null;

            if(tileset != null && tile.textureOffset != null) {
                tileset.applyToNode(
                    tileNode,
                    tile.textureOffset.x,
                    tile.textureOffset.y
                );
            }

            G.gameView.levelView.addBakedNode(tileNode);
        }
    }

    /**
     * @param {Vector2} position
     */
    onPlaceWall(position) {
        const tileNode = new ENode();
        tileNode.__img = "white";
        tileNode.__size = [G.config.tileSize, G.config.tileSize];
        tileNode.__ofs = math2d.flipY(math2d.mul(position, G.config.tileSize));

        G.gameView.levelView.addBakedNode(tileNode);
    }

    /**
     * @param {Level} level
     * @param {Vector2} position
     */
    onPlaceFloor(level, position) {
        const tileNode = new ENode();
        tileNode.__img = "wall_tileset";
        tileNode.__size = [G.config.tileSize, G.config.tileSize];
        tileNode.__ofs = math2d.flipY(math2d.mul(position, G.config.tileSize));

        const tileset = level.getRooms()[0].asset.tileset;

        tileset.applyToNode(tileNode, 1, 1);
        G.gameView.levelView.addBakedNode(tileNode);
    }

    /**
     *
     * @param {ENode} windowNode
     */
    onWindowOpen(windowNode) {
        const tileSelection = G.gameView.levelView.tileSelectionView;

        if(tileSelection != null) {
            tileSelection.disable();
        }
    }

    /**
     *
     * @param {ENode} windowNode
     */
    onWindowClose(windowNode) {
        const tileSelection = G.gameView.levelView.tileSelectionView;

        if(tileSelection != null) {
            tileSelection.enable();
        }
    }
}
