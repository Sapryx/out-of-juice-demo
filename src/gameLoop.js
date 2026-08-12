let gameLoop = {
    __update: function(t, dt) {
        handleInput();
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
    G.turnManager.isPlayerTurn = false;

    G.player.moveHorizontal(movementInput.x * Cfg.TileSize);
    G.player.moveVertical(movementInput.y * Cfg.TileSize);

    BUS.__post(Events.EntityMove, G.player);
}
