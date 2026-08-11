let gameLoop = {
    __update: function(t, dt) {
        handleInput();
        render();
    }
};

function handleInput() {
    const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
    const inputIsEmpty = movementInputRaw.x === 0 && movementInputRaw.y === 0;
    const notPlayerTurn = !G.turnManager.isPlayerTurn;
    const playerIsDead = G.player == null;

    console.log(notPlayerTurn);

    if(inputIsEmpty || notPlayerTurn || playerIsDead) {
        return;
    }

    if(movementInputRaw.x !== 0) {
        movementInputRaw.y = 0;
    }

    movePlayer(movementInputRaw);
}

function movePlayer(movementInput) {
    const scale = 16;

    if(movementInput.x !== 0) {

    }

    G.player.moveHorizontal(movementInput.x * scale);
    G.player.moveVertical(movementInput.y * scale);

    G.turnManager.isPlayerTurn = false;

    _setTimeout(() => {
        G.turnManager.isPlayerTurn = true;
    }, 0.2);
}

function render() {
    if(G.player == null) {
        return;
    }

    G.playerView.__x = G.player.pos.x + 8;
    G.playerView.__y = -G.player.pos.y - 8 + 3;
}
