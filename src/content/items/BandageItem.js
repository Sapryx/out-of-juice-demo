class BandageItem extends ItemAsset {
    constructor(id, config) {
        super(id, config);
        this._restorationAmount = 15;
        this._description = `Restores ${this._restorationAmount} hp.`;
    }

    use(user) {
        super.use(user);
        return user.heal(this._restorationAmount);
    }
}
