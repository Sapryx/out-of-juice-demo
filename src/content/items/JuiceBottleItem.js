class JuiceBottleItem extends ItemAsset {
    constructor(id, config) {
        super(id, config);
        this._restorationAmount = 20;
        this._description = `Restores ${this._restorationAmount} HP. Boosts morale and dopamine levels.`;
    }
}
