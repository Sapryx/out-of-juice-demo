class Player extends GameEntity {
    constructor(config) {
        super(config);
        this.canMove = true;
    }

    moveTo(position) {
        if(!this.canMove) {
            return false;
        }

        this.canMove = false;

        _setTimeout(() => {
            this.canMove = true;
        }, G.config.tilePassTime);

        return super.moveTo(position);
    }
}
