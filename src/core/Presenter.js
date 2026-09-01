class Presenter {
    onAddEntity(entity) {
        G.entityViews.add(entity);
    }

    onRemoveEntity(entity) {
        G.entityViews.remove(entity);
        G.targeting.update();
    }

    onEntitySpriteUpdate(entity, spritePath) {
        const view = G.entityViews.get(entity);

        if(!view) return;

        view.node.__setAliasesData({
            sprite: {
                __img: spritePath
            }
        });
    }

    onMoveEntity(entity, callback) {
        const view = G.entityViews.get(entity);

        if(!view) return;

        const targetPosition = math2d.flipY(entity.position);
        const animationDuration = G.config.tilePassTime;

        view.node.__z = SpriteSorting.getZ(SortingLayer.Entities) + entity.position.y;

        if(entity !== G.player && entity.isHostile) {
            const playerDirection = sign(G.player.position.x - entity.position.x);

            if(playerDirection !== 0) {
                view.node.__scalex = playerDirection;
            }
        }

        if(entity === G.player) {
            G.audio.play(SFX.PlayerWalk);
        }

        G.targeting.update();

        Anims.walk(view.node, targetPosition, animationDuration)
            .__setOnComplete(callback);
    }

    onEntityAttack(attacker, target, onHitTarget, onComplete) {
        const attackerView = G.entityViews.get(attacker);
        const targetPosition = math2d.flipY(target.position);
        const startPosition = math2d.flipY(attacker.position);

        if(attackerView) {
            Anims.attack(
                attackerView.node,
                startPosition,
                targetPosition,
                0.25,
                () => {
                    G.audio.play(attacker.dealDamageSfx);
                    G.audio.play(target.takeDamageSfx);
                    onHitTarget();
                },
                onComplete
            );
        }

        G.audio.play(SFX.Swing);
    }

    onEntityHurt(entity) {
        const view = G.entityViews.get(entity);
        Anims.hurt(view.node, 0.1);

        if(entity === G.player) {
            Anims.healthBarDamage(G.gameView.gui.node.health_bar.health_bar_fill, 0.1);
        }
    }

    onEntityHeal(entity) {
        if(entity === G.player) {
            Anims.healthBarDamage(G.gameView.gui.node.health_bar.health_bar_fill, 0.1);
        }
    }

    onPlayerDeath(player) {
        if(G.windows.hasOpenWindow) {
            G.windows.closeCurrentWindow();
        }

        G.player = null;
        G.windows.openDeathWindow();
    }

    onItemCollected() {
        G.audio.play(SFX.Collect);
    }

    onPlayerInventoryChanged() {
        const currentWindow = G.windows.current;

        if(currentWindow.type === WindowType.Inventory) {
            currentWindow.refreshItemSidebar();
        }
    }

    /**
     * @param {Level} level
     */
    onRenderLevel(level) {
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
    }

    /**
     * @param {Room} room
     */
    onAddRoom(room) {

    }

    /**
     * @param {Vector2} position
     */
    onPlaceWall(position) {

    }

    /**
     * @param {Level} level
     * @param {Vector2} position
     */
    onPlaceFloor(level, position) {

    }

    /**
     *
     * @param {ENode} windowNode
     */
    onWindowOpen(windowNode) {
        G.gameView.levelView.tileSelection.__alpha = 0;
    }

    /**
     *
     * @param {ENode} windowNode
     */
    onWindowClose(windowNode) {
        G.gameView.levelView.tileSelection.__alpha = 1;
    }
}
