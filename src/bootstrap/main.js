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
    G.presenter = new Presenter();
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

    G.level = level;

    level.respawnPlayer();

    level.addEntity(G.defs.create("sweeper"), math2d.add(G.player.position, new Vector2(0, 2)));

    level.initRooms();

    G.turnManager.setEntity(G.player);

    updatable.__push(gameLoop);
}
