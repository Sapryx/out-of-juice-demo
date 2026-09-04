class JuiceFactory {
    constructor(levelGenerator, config) {
        this.config = config;

        if(!this.levelCount || this.levelCount <= 0) {
            throw new Error(`Cannot create factory with level count of "${this.levelCount}"`);
        }

        this.levelGenerator = levelGenerator;
        this.levels = [];
        this.currentLevelIndex = 0;
    }

    get currentLevel() {
        return this.levels[this.currentLevelIndex];
    }

    get levelCount() {
        return this.config.levels.length;
    }

    generateLevels() {
        for(const levelConfig of this.config.levels) {
            this.levels.push(this.levelGenerator.generateLevel(levelConfig));
        }

        this._switchLevel(0);
    }

    moveToNextLevel() {
        const nextLevelIndex = this.currentLevelIndex + 1;

        if(nextLevelIndex < this.levelCount) {
            this._switchLevel(nextLevelIndex);
            return true;
        }

        return false;
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
