const ENTITY_FACTORIES = [
    ["player", Player],
    ["sweeper", Sweeper]
];

const ITEM_FACTORIES = [
    ["bandage", BandageItem]
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

    registerItems() {
        let remaining = ITEM_FACTORIES.length;

        if(remaining === 0) {
            return;
        }

        ITEM_FACTORIES.forEach(([id, factory]) => {
            getJson(`configs/items/${id}.json`, (config) => {
                G.itemAssets.register(id, new factory(id, config));
                remaining--;
            });
        });

        console.log(`Registered ${G.itemAssets.count} items`);
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
    }
};
