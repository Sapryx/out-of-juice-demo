BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        const levelGenerator = new LevelGenerator();

        initializeState();
        registerContent();
        G.level = levelGenerator.generateLevel();
        initializeGame();
        startGame();

        return 1;
    }
);

function initializeState() {
    // Content
    G.defs = new Defs();
    G.roomAssetRegistry = new RoomAssetRegistry();
    G.levelTypeRegistry = new LevelTypeRegistry();

    // Systems
    G.turnManager = new TurnManager();

    // Rendering
    G.levelView = scene.__addChildBox("game");
    G.entityViews = new EntityViewManager();
}

function registerContent() {
    contentBootstrapper.registerConfigs();
    contentBootstrapper.registerEntities();
    contentBootstrapper.registerLevelTypes();
    contentBootstrapper.registerRoomAssets();
}

function initializeGame() {
    Input.init();
    camera.__zoom = 2;
}

function startGame() {
    G.player = G.defs.create("player");
    G.level.addEntity(G.player, new Vector2(-8, 0));
    // G.level.addEntity(G.defs.create("sweeper"), new Vector2(-8, 1));

    updatable.__push(gameLoop);
}
