const ENTITY_FACTORIES = [
    ["player", Player],
    ["sweeper", Sweeper],
    ["item_entity", ItemEntity],
];

const ITEM_FACTORIES = [
    ["bandage", BandageItem]
];

const LEVEL_TYPE_COUNT = 1;

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

        console.log(`Registered ${G.defs.count} entities`);
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
                G.levelTypes.register(new LevelType(id, config));
            });
        }

        console.log(`Registered ${G.levelTypes.count} level types`);
    },

    registerRoomAssets() {
        this._registerRoomAsset(RoomType.Combat, "room_combat_d2_1");
        this._registerRoomAsset(RoomType.Combat, "room_combat_d2_2");
        this._registerRoomAsset(RoomType.Combat, "room_combat_d2_3");
        this._registerRoomAsset(RoomType.Combat, "room_combat_d2_4");

        this._registerRoomAsset(RoomType.Exit, "room_exit_1");

        this._registerRoomAsset(RoomType.Hub, "room_hub_d3_1");

        this._registerRoomAsset(RoomType.Start, "room_start_1");

        console.log(`Registered ${G.roomAssets.count} rooms`);
    },

    _registerRoomAsset(type, id) {
        getJson(`configs/rooms/${type}/${id}.json`, (config) => {
            G.roomAssets.register(type, new RoomAsset(id, config));
        });
    }
};
