class BandageItem extends HealingItem {
    constructor(id, config) {
        super(id, config);
        this.useSfx = SFX.TearCloth;
    }
}
