class BandageItem extends ItemAsset {
    constructor() {
        super();
        this._id = "bandage";
        this._name = "Bandage";
        this._restorationAmount = 15;
        this._description = `Restores ${this._restorationAmount} hp.`;
    }

    use(user) {
        super.use(user);
        return user.heal(this._restorationAmount);
    }
}
