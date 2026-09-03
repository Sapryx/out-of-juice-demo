BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        initializeState();
        registerContent();
        initializeGame();

        return 1;
    }
);

function initializeState() {
    // Content
    G.defs = new Defs();
    G.roomAssets = new RoomAssetRegistry();
    G.levelTypes = new LevelTypeRegistry();
    G.itemAssets = new ItemAssetRegistry();
    G.ruleTiles = new RuleTileRegistry();

    // Systems
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
    updatable.__push(gameLoop);

    G.input.init();
    restartGame();
}

function restartGame() {
    const levelGenerator = new LevelGenerator();

    G.player = G.defs.create("player");
    G.factory = new JuiceFactory(levelGenerator, {
        levels: [
            {
                tileset: "surface_tileset"
            },
            {
                tileset: "first_floor_tileset"
            },
            {
                tileset: "first_floor_tileset"
            }
        ]
    });
    G.factory.generateLevels();
    G.turnManager.setEntity(G.player);

    G.player.dealDamage(10);
}
