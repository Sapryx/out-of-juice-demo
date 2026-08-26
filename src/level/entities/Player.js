class Player extends GameEntity {
    constructor(config) {
        super(config);
    }

    _die() {
        super._die();
        restartGame();
    }
}
