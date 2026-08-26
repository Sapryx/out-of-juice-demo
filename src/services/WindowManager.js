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

        G.presenter.onWindowOpen(window);
    }

    closeCurrent() {
        if(this.windowIsOpen) {
            const window = this._currentWindow;

            window.close();
            this._currentWindow = null;

            G.presenter.onWindowClose(window);
        }
    }
}
