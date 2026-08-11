BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        scene.__addChildBox("test_level");
        // G.player = scene.__addChildBox(Prototypes.Player);

        camera.__zoom = 4;

        updatable.__push(gameLoop);
        Input.init();

        return 1;
    }
);
