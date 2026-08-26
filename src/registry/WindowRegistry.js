class WindowRegistry {
    constructor() {
        this._windows = new Map();
    }

    /**
     * @param {() => GameWindow} type
     */
    register(type) {
        this._windows.set(type, new type());
    }

    /**
     * @param {() => GameWindow} type
     * @returns {GameWindow}
     */
    get(type) {
        const window = this._windows.get(type);

        if(window === undefined) {
            throw new Error(`Window with type ${type} not found`);
        }

        return window;
    }
}
