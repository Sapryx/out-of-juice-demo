BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        scene.__addChildBox("test_level")
        updatable.__push(gameLoop);
        return 1;
    }
);
