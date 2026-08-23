class GameView {
    /**
     * @param {ENode} scene
     */
    constructor(scene) {
        this.levelView = new LevelView(scene);
        this._gui = scene.__addChildBox("gui");
    }
}
