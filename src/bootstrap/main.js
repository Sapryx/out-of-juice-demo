BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        scene.__addChildBox("test_level");

        G.player = new Player();
        G.turnManager = new TurnManager();
        G.level = new Level();
        G.level.addEntity(G.player);

        G.entityViews = new EntityViews();
        G.entityViews.add(Prototypes.Player);

        camera.__zoom = 4;

        updatable.__push(gameLoop);
        Input.init();

        return 1;
    }
);
