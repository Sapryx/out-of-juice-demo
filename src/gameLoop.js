let gameLoop = {
    __update: function(t, dt) {
        const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
        const movementInput = math2d.normalize(movementInputRaw);

        if(G.player != null) {
            G.player.__x += movementInput.x;
            G.player.__y += -movementInput.y;
        }

        return 0;
    }
};
