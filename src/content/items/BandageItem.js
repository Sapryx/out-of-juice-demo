class BandageItem extends ItemAsset {
    constructor(id, config) {
        super(id, config);
        this._restorationAmount = 25;
        this._description = `Restores ${this._restorationAmount} HP.`;
    }

    use(user) {
        super.use(user);
        return user.heal(this._restorationAmount);
    }
}
