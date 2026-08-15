const ENTITY_FACTORIES = [
    ["player", Player],
    ["sweeper", Sweeper]
];

BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        // TODO replace with addToScene();
        G.levelView = scene.__addChildBox("game");

        const levelNode = G.levelView.__addChildBox("test_level");

        const levelScreenSize = new Vector2(levelNode.__width, levelNode.__height);
        const levelWorldSize = math2d.div(levelScreenSize, Cfg.TileSize);

        if(levelWorldSize.y > levelWorldSize.x) {
            throw new Error("Level width must be greater than the height for the current position tracking to work!");
        }

        Input.init();
        G.defs = new Defs();
        G.turnManager = new TurnManager();
        G.level = new Level(levelWorldSize);
        G.entityViews = new EntityViewManager();

        camera.__zoom = 4;

        loadEntityDefs(G.defs, ENTITY_FACTORIES, () => {
            G.player = G.defs.create("player");
            G.level.addEntity(G.player, new Vector2(0, 0));
            G.level.addEntity(G.defs.create("sweeper"), new Vector2(1, 0));

            updatable.__push(gameLoop);
        });

        return 1;
    }
);

/**
 * @param {Defs} defs
 * @param {Array<[string, Function]>} entries
 * @param {Function} onLoaded
 */
function loadEntityDefs(defs, entries, onLoaded) {
    let remaining = entries.length;

    if (remaining === 0) {
        onLoaded();
        return;
    }

    entries.forEach(([id, factory]) => {
        getJson(`configs/${id}.json`, (config) => {
            defs.register(id, config, factory);

            console.log(config);

            remaining--;
            if (remaining === 0) {
                onLoaded();
            }
        });
    });
}
