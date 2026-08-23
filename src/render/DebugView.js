class DebugView {
    constructor(parent) {
        this._node = parent.__traverse(node =>
            node.__userData && node.__userData.type === "debug_info" ? node : undefined
        );

        this._mousePositionText = this._node.__traverse(node =>
            node.__userData && node.__userData.type === "mouse_pos" ? node : undefined
        );
    }

    update() {
        const mouseWorldPos = Input.getMouseWorldPosition(G.gameView.levelView.camera);
        this._mousePositionText.__text = `(${round(mouseWorldPos.x)}; ${round(mouseWorldPos.y)})`;
    }
}
