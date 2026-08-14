BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        G.levelView = scene.__addChildBox("game");
        const levelNode = G.levelView.__addChildBox("test_level");

        const levelScreenSize = new Vector2(levelNode.__width, levelNode.__height);
        const levelWorldSize = math2d.div(levelScreenSize, Cfg.TileSize);

        if(levelWorldSize.y > levelWorldSize.x) {
            throw new Error("Level width must be greater than the height for the current position tracking to work!");
        }

        Input.init();
        G.defs = new Defs();
        G.turnManager = new TurnManager();
        G.level = new Level(levelWorldSize);
        G.entityViews = new EntityViewManager();

        G.defs.register("player", {maxHealth: 100}, Player);
        G.defs.register("sweeper", {maxHealth: 20}, Sweeper);

        G.player = G.defs.create("player");
        G.level.addEntity(G.player, new Vector2(0, 0));
        G.level.addEntity(G.defs.create("sweeper"), new Vector2(1, 0));

        camera.__zoom = 4;
        updatable.__push(gameLoop);

        return 1;
    }
);
