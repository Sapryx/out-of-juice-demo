BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        scene.__addChildBox("test_level");
        updatable.__push(gameLoop);
        Input.init();

        return 1;
    }
);
