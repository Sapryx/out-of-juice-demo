let gameLoop = {
    __update: function(t, dt) {
        handleInput();

        G.turnManager.tick();

        updateCameraPosition();
        G.gameView.update();
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

    G.player.moveBy(movementInputRaw);
    G.turnManager.commitTurn();
}

function updateCameraPosition() {
    if(G.player == null) {
        return;
    }

    const playerView = G.entityViews.get(G.player);
    const levelCamera = G.gameView.levelView.camera;

    if(playerView == null || levelCamera == null) {
        return;
    }

    levelCamera.__x = playerView.position.x;
    levelCamera.__y = -playerView.position.y;
}
