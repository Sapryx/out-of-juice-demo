class GameView {
    constructor(scene) {
        this.levelView = new LevelView(scene);
        this.gui = new Gui(scene);
    }

    init() {
        this.levelView.init();
        this.gui.init();

        this.levelView.camera = this._createCamera();
        this.levelView.camera.__zoom = 1.4;
        this.levelView.node.__allProjectionMatrix = this.levelView.camera.__projectionMatrix;
    }

    cleanup() {
        this.levelView.cleanup();
        this.gui.cleanup();
    }

    reset() {
        this.cleanup();
        this.init();
    }

    update() {
        this.levelView.update();
        this.gui.update();
    }

    _createCamera() {
        const camera = new CameraOrtho();

        updateCamera(__screenSize.x, __screenSize.y, camera, 0, 0);

        BUS.__addEventListener(__ON_RESIZE, (_) => {
            updateCamera(__screenSize.x, __screenSize.y, camera, 0, 0);
        });

        return camera;
    }
}
