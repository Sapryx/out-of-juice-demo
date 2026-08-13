BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        G.levelView = scene.__addChildBox("test_level");

        Input.init();
        G.player = new Player();
        G.turnManager = new TurnManager();
        G.level = new Level();

        G.entityViews = new EntityViewManager();

        camera.__zoom = 4;

        G.level.addEntity(G.player);
        G.level.addEntity(new Sweeper());

        updatable.__push(gameLoop);

        return 1;
    }
);
