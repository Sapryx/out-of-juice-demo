BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        initializeState();
        registerContent();
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
    G.gameView = new GameView(scene);
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
    G.gameView.init();
}

function startGame() {
    const levelGenerator = new LevelGenerator();
    const level = levelGenerator.generateLevel();

    level.respawnPlayer();
    G.level = level;

    updatable.__push(gameLoop);
}
