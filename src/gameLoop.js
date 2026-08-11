let gameLoop = {
    __update: function(t, dt) {
        const movementInputRaw = new Vector2(Input.getAxis(Axis.Horizontal), Input.getAxis(Axis.Vertical));
        const movementInput = math2d.normalize(movementInputRaw);

        console.log(movementInput);

        return 0;
    }
};
