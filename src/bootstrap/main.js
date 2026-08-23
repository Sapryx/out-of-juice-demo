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

    G.levelCamera = new CameraOrtho();
    G.guiCamera = camera;

    G.gameView.levelView._node.__camera = G.levelCamera;
    G.gameView._gui.__camera = G.guiCamera;

    console.log(scene.__childs[0].__camera === G.levelCamera);
    console.log(scene.__childs[1].__camera === G.guiCamera);

    renderer.__renderLoop = function() {
        let c = 0;

        updateCamera(__screenSize.x, __screenSize.y, G.guiCamera, 0, 0);

        $each(scenes, function(s) {
            if(s.__childs.length) {
                renderer.__setRenderTarget(0);
                if(!c) {
                    renderer.__clear();
                    c = 1;
                }
                for(let i = 0; i < s.__childs.length; i++) {
                    const gg = s.__childs[i];
                    renderer.__render(gg, gg.__camera || camera);
                }
            }
        });

        renderer.__finishRender();
    };
}

function startGame() {
    const levelGenerator = new LevelGenerator();
    const level = levelGenerator.generateLevel();

    level.respawnPlayer();
    G.level = level;

    updatable.__push(gameLoop);
}
