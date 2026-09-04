class Item {
    constructor(asset) {
        this.asset = asset;
    }

    use(user) {
        const itemWasUsed = this.asset.use(user);

        if(itemWasUsed) {
            BUS.__post(E.ItemUsed, this);
        }

        return itemWasUsed;
    }
}
