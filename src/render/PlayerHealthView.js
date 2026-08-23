class PlayerHealthView {
    /**
     * @param {ENode} parent
     */
    constructor(parent) {
        this._node = parent.__traverse(node =>
            node.__userData && node.__userData.type === "player_health_view" ? node : undefined
        );
        this._text = this._node.__text;
        this._fill = this._node.__findChild(node => node.__userData && node.__userData.type === "fill");
    }

    /**
     * @param {float} current
     * @param {float} max
     */
    setValue(current, max) {
        this._fill.__width = current / max;
        this._text.__text = current;
    }
}
