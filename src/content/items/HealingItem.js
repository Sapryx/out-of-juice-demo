class HealingItem extends ItemAsset {
    constructor(id, config) {
        super(id, config);
        this._restorationAmount = config.restorationAmount ? config.restorationAmount : 0;
        this._description = `Restores ${this._restorationAmount} HP.`;
    }

    use(user) {
        super.use(user);
        return user.heal(this._restorationAmount);
    }
}
