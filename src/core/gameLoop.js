let gameLoop = {
    __update: function(t, dt) {
        handleInput();
        G.level.tick();
    }
};

function handleInput() {
    const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
    const inputIsEmpty = movementInputRaw.x === 0 && movementInputRaw.y === 0;
    const notPlayerTurn = !G.turnManager.isPlayerTurn;
    const playerIsDead = G.player == null;

    if(inputIsEmpty || notPlayerTurn || playerIsDead) {
        return;
    }

    if(movementInputRaw.x !== 0) {
        movementInputRaw.y = 0;
    }

    movePlayer(movementInputRaw);
}

function movePlayer(movementInput) {
    const movement = math2d.mul(movementInput, Cfg.TileSize);

    G.turnManager.isPlayerTurn = false;

    G.player.moveHorizontal(movement.x);
    G.player.moveVertical(movement.y);

    BUS.__post(E.EntityMove, G.player);
}
