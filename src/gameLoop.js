let gameLoop = {
    __update: function(t, dt) {
        const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
        const movementInput = math2d.normalize(movementInputRaw);
        const inputIsEmpty = movementInput.x === 0 && movementInput.y === 0;
        const notPlayerTurn = !G.turnManager.isPlayerTurn;
        const playerIsDead = G.player == null;

        console.log(notPlayerTurn);

        if(inputIsEmpty || notPlayerTurn || playerIsDead) {
            return;
        }

        this.__movePlayer(movementInput);
    },

    __movePlayer(movementInput) {
        const scale = 16;
        G.player.__x += movementInput.x * scale;
        G.player.__y += -movementInput.y * scale;

        G.turnManager.isPlayerTurn = false;

        _setTimeout(() => {
            G.turnManager.isPlayerTurn = true;
        }, 0.2);
    }
};
