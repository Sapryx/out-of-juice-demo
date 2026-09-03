class JuiceFactory {
    constructor(levelGenerator, levelCount) {
        this.levelGenerator = levelGenerator;
        this.levelCount = levelCount;
        this.level = null;
        this.levels = [];
        this.currentLevelId = 0;
    }

    generateLevels() {
        const level = this.levelGenerator.generateLevel();
        this.level = level;

        level.addPlayer(G.player);
        level.initRooms();
    }
}
