let gameLoop = {
    __update: function(t, dt) {
        if(!G.windows.hasOpenWindow) {
            handleGameInput();
            G.turnManager.tick();
            updateCameraPosition();
        }

        G.gameView.update();
        G.input.reset();
    }
};

function handleGameInput() {
    if(!G.player || !G.turnManager.isPlayerTurn || !G.player.isIdle) {
        return;
    }

    handleAttackInput() || handleMovementInput();
}

function handleAttackInput() {
    const attackIsPressed = G.input.consumeAttack();

    if(!attackIsPressed) {
        return false;
    }

    const target = G.targeting.current;

    if(!target) {
        return false;
    }

    const action = target.getInteractionAction(G.player);
    return G.turnManager.submit(action);
}

function handleMovementInput() {
    const movementInputRaw = new Vector2(G.input.getAxis(Axis.Horizontal), G.input.getAxis(Axis.Vertical));
    const inputIsEmpty = movementInputRaw.x === 0 && movementInputRaw.y === 0;

    if(inputIsEmpty) {
        return false;
    }

    if(movementInputRaw.x !== 0) {
        movementInputRaw.y = 0;
    }

    const targetPosition = math2d.add(G.player.position, movementInputRaw);

    if(G.level.isTileFree(targetPosition)) {
        return G.turnManager.submit(new MoveAction(G.player, targetPosition));
    }

    return null;
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
