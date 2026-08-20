let gameLoop = {
    __update: function(t, dt) {
        handleInput();
        G.level.tick();
        updateCameraPosition();
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

/**
 * @param {Vector2} movementInput
 */
function movePlayer(movementInput) {
    G.turnManager.isPlayerTurn = false;
    G.player.moveBy(movementInput);

    BUS.__post(E.EntityMove, G.player);
}

function updateCameraPosition() {
    if(G.player == null) {
        return;
    }

    const playerView = G.entityViews.get(G.player);
    camera.__x = playerView.position.x;
    camera.__y = -playerView.position.y;
}
