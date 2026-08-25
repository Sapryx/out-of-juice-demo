let gameLoop = {
    __update: function(t, dt) {
        handleInput();

        G.turnManager.tick();

        updateCameraPosition();
        G.gameView.update();
    }
};

function handleInput() {
    const notPlayerTurn = !G.turnManager.isPlayerTurn;
    const playerIsDead = G.player == null;

    if(playerIsDead || notPlayerTurn) {
        return;
    }

    const playerHasMoved = handleMovementInput();
    const playerHasAttacked = handleAttackInput();

    if(playerHasMoved || playerHasAttacked) {
        G.turnManager.commitTurn();
    }
}

/**
 * @returns {boolean}
 */
function handleMovementInput() {
    const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
    const inputIsEmpty = movementInputRaw.x === 0 && movementInputRaw.y === 0;
    const playerIsMoving = G.player._state === EntityState.Moving;

    if(inputIsEmpty || playerIsMoving) {
        return false;
    }

    if(movementInputRaw.x !== 0) {
        movementInputRaw.y = 0;
    }

    return G.player.moveBy(movementInputRaw, undefined);
}

/**
 * @returns {boolean}
 */
function handleAttackInput() {
    const attackIsPressed = Input.consumeAttack();

    if(!attackIsPressed) {
        return false;
    }

    const levelCamera = G.gameView.levelView.camera;
    const mouseGridPosition = Input.getMouseGridPosition(levelCamera);
    const target = G.level.getEntityInTile(mouseGridPosition);

    if(target === undefined || !G.player.canAttack(target)) {
        return false;
    }

    G.player.attack(target);
    return true;
}

function updateCameraPosition() {
    if(G.player == null) {
        return;
    }

    const playerView = G.entityViews.get(G.player);
    const levelCamera = G.gameView.levelView.camera;
    const playerIsAttacking = G.player.isAttacking;

    if(playerView == null || levelCamera == null || playerIsAttacking) {
        return;
    }

    levelCamera.__x = playerView.position.x;
    levelCamera.__y = -playerView.position.y;
}
