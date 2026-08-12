BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        scene.__addChildBox("test_level");

        Input.init();
        G.player = new Player();
        G.turnManager = new TurnManager();
        G.level = new Level();
        G.entityViews = new EntityViews();

        camera.__zoom = 4;
        G.level.addEntity(G.player);
        updatable.__push(gameLoop);

        return 1;
    }
);
