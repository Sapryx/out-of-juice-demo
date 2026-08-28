class GameWindow {
    constructor() {
        this._parent = parent;
        this._id = "";
        this._node = null;
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    open() {
        this._node = showWindow(this._id, (node) => this._onShowWindow(node));
    }

    close() {
        this._node.__close();
        this._node = null;
    }

    _onShowWindow(windowNode) {

    }
}
