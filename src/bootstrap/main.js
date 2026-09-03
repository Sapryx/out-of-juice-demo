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
    const levelGenerator = new LevelGenerator();

    // Content
    G.defs = new Defs();
    G.roomAssets = new RoomAssetRegistry();
    G.levelTypes = new LevelTypeRegistry();
    G.itemAssets = new ItemAssetRegistry();
    G.ruleTiles = new RuleTileRegistry();

    // Systems
    G.factory = new JuiceFactory(levelGenerator);
    G.input = new Input();
    G.turnManager = new TurnManager();
    G.targeting = new PlayerTargeting();

    // Rendering
    G.gameView = new GameView(scene);
    G.entityViews = new EntityViewManager();
    G.windows = new GameWindowManager();
    G.audio = new GameAudio();
}

function registerContent() {
    contentBootstrapper.registerConfigs();
    contentBootstrapper.registerEntities();
    contentBootstrapper.registerItems();
    contentBootstrapper.registerLevelTypes();
    contentBootstrapper.registerRoomAssets();
}

function initializeGame() {
    document.body.style.cursor = "none";
    G.input.init();
    G.gameView.init();

    updatable.__push(gameLoop);
}

function startGame() {
    setupLevel();
}

function restartGame() {
    G.gameView.reset();
    G.entityViews.cleanup();

    setupLevel();
}

function setupLevel() {
    G.player = G.defs.create("player");
    G.factory.generateLevels();
    // G.factory.switchLevel(0);
    G.turnManager.setEntity(G.player);
}
