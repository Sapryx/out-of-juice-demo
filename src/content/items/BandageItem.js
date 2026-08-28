class BandageItem extends GameItem {
    constructor() {
        super();
        this._id = "bandage";
        this._name = "Bandage";
        this._restorationAmount = 15;
        this._description = `Restores ${this._restorationAmount} hp.`;
    }
}
