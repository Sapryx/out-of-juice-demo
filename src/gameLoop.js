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

let walkAnim = null;

function movePlayer(movementInput) {
    const scale = 16;
    const walkSpeed = 0.15;

    G.turnManager.isPlayerTurn = false;

    G.playerView.__x = G.player.pos.x;
    G.playerView.__y = -G.player.pos.y;

    G.player.moveHorizontal(movementInput.x * scale);
    G.player.moveVertical(movementInput.y * scale);

    walkAnim = anim(G.playerView, {
        __x: G.player.pos.x,
        __y: -G.player.pos.y
    }, walkSpeed);

    _setTimeout(() => {
        G.turnManager.isPlayerTurn = true;
    }, walkSpeed);
}
