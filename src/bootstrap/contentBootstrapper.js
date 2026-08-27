const ENTITY_FACTORIES = [
    ["player", Player],
    ["sweeper", Sweeper]
];

const LEVEL_TYPE_COUNT = 1;

const ROOM_ASSETS = [
    ["combat", 4],
    ["hub", 1],
    ["exit", 1],
    ["start", 1]
];

const contentBootstrapper = {
    registerConfigs() {
        getJson("configs/game.json", (config) => {
            G.config = new GameConfig(config);
        });
    },

    registerEntities() {
        let remaining = ENTITY_FACTORIES.length;

        if(remaining === 0) {
            return;
        }

        ENTITY_FACTORIES.forEach(([id, factory]) => {
            getJson(`configs/entities/${id}.json`, (config) => {
                G.defs.register(id, config, factory);
                remaining--;
            });
        });
    },

    registerLevelTypes() {
        for(let i = 0; i < LEVEL_TYPE_COUNT; i++) {
            const id = `level_type_${i + 1}`;

            getJson(`configs/level_types/${id}.json`, (config) => {
                G.levelTypeRegistry.register(new LevelType(id, config));
            });
        }
    },

    registerRoomAssets() {
        ROOM_ASSETS.forEach(([type, count]) => {
            for(let i = 0; i < count; i++) {
                const id = `room_${type}_${i + 1}`;

                    getJson(`configs/rooms/${type}/${id}.json`, (config) => {
                    G.roomAssetRegistry.register(type, new RoomAsset(id, config));
                });
            }
        });
    },

    registerWindows() {
        G.windowRegistry.register(InventoryWindow);
    }
};
