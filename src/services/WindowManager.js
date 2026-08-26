class WindowManager {
    constructor() {
        this._currentWindow = null;
    }

    get windowIsOpen() {
        return this._currentWindow != null;
    }

    open(windowType) {
        const window = G.windowRegistry.get(windowType);
        this._currentWindow = window;
        window.open();
    }

    closeCurrent() {
        if(this.windowIsOpen) {
            this._currentWindow.close();
            this._currentWindow = null;
        }
    }
}
