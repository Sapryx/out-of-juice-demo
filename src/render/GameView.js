class GameView {
    /**
     * @param {ENode} scene
     */
    constructor(scene) {
        this.levelView = new LevelView(scene);
        this.gui = new Gui(scene);
    }

    init() {
        const levelCamera = this._createCamera();
        const guiCamera = camera;

        this.levelView.camera = levelCamera;
        this.gui.camera = guiCamera;

        levelCamera.__zoom = 3;

        renderer.__renderLoop = function() {
            let c = 0;

            updateCamera(__screenSize.x, __screenSize.y, guiCamera, 0, 0);

            $each(scenes, function(s) {
                if(s.__childs.length) {
                    renderer.__setRenderTarget(0);
                    if(!c) {
                        renderer.__clear();
                        c = 1;
                    }
                    for(let i = 0; i < s.__childs.length; i++) {
                        const gg = s.__childs[i];
                        renderer.__render(gg, gg.__camera || camera);
                    }
                }
            });

            renderer.__finishRender();
        };
    }

    update() {
        this.gui.update();
    }

    /**
     * @returns {CameraOrtho}
     */
    _createCamera() {
        const camera = new CameraOrtho();

        updateCamera(__screenSize.x, __screenSize.y, camera, 0, 0);

        BUS.__addEventListener(__ON_RESIZE, (_) => {
            updateCamera(__screenSize.x, __screenSize.y, camera, 0, 0);
        });

        return camera;
    }
}
