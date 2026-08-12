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

    G.playerView.__x = G.player.pos.x;
    G.playerView.__y = -G.player.pos.y;

    G.player.moveHorizontal(movementInput.x * Cfg.TileSize);
    G.player.moveVertical(movementInput.y * Cfg.TileSize);

    killAnim(G.playerView);

    anim(G.playerView, {
        __x: G.player.pos.x,
        __y: -G.player.pos.y
    }, Cfg.MovementSpeed)
        .__setOnComplete(() => {
            G.turnManager.isPlayerTurn = true;
        });
}
