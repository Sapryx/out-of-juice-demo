class JuiceBottleItem extends HealingItem {
    constructor(id, config) {
        super(id, config);
        this._description = `${this._description} Boosts morale and dopamine levels.`;
        this.useSfx = SFX.Drink;
    }
}
