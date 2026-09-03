class JuiceFactory {
    constructor(levelGenerator, levelCount) {
        if(!levelCount || levelCount <= 0) {
            throw new Error(`Cannot create factory with level count of "${levelCount}"`);
        }

        this.levelGenerator = levelGenerator;
        this.levelCount = levelCount;
        this.level = null;
        this.levels = [];
        this.currentLevelIndex = 0;
    }

    get currentLevel() {
        return this.levels[this.currentLevelIndex];
    }

    generateLevels() {
        const level = this.levelGenerator.generateLevel();
        this.level = level;
        this.levels[0] = level;
        this.levels[1] = this.levelGenerator.generateLevel();

        this._switchLevel(0);
    }

    moveToNextLevel() {
        const nextLevelIndex = this.currentLevelIndex + 1;

        if(nextLevelIndex < this.levelCount) {
            this._switchLevel(nextLevelIndex);
        }
    }

    _switchLevel(index) {
        if(index < 0 || index >= this.levelCount) {
            throw new RangeError(`Level index "${index}" is out of range (0-${this.levelCount})`);
        }

        const level = this.levels[index];
        this.currentLevelIndex = index;

        BUS.__post(E.LevelSwitched, level);

        level.spawnEntities();
        level.addPlayer(G.player);
    }
}
