class Inventory {
    constructor(size) {
        if(size < 1) {
            throw new RangeError(`Cannot create inventory with zero or negative size`);
        }

        this._itemCount = 0;
        this._maxSize = size;
        this._items = new Array(size).fill(null);
    }

    get itemCount() {
        return this._itemCount;
    }

    get maxSize() {
        return this._maxSize;
    }

    getItem(slot) {
        this._verifySlotIsInRange(slot);
        return this._items[slot];
    }

    getSlot(item) {
        return this._items.indexOf(item);
    }

    getItems() {
        return Object.freeze([...this._items]);
    }

    addItem(item) {
        const freeSlot = this._items.indexOf(null);
        const freeSlotNotFound = freeSlot === -1;

        if(freeSlotNotFound) {
            return false;
        }

        this._items[freeSlot] = item;
        this._itemCount++;
        return true;
    }

    removeItem(item) {
        const slot = this.getSlot(item);

        if(slot === -1) {
            return false;
        }

        return this.removeItemAt(slot);
    }

    removeItemAt(slot) {
        this._verifySlotIsInRange(slot);
        const noItemInSlot = this._items[slot] == null;

        if(noItemInSlot) {
            return false;
        }

        this._itemCount--;
        this._items[slot] = null;
        G.presenter.onPlayerInventoryChanged();

        return true;
    }

    hasItem(slot) {
        if(!this._slotIsInRange(slot)) {
            return false;
        }

        return this._items[slot] != null;
    }

    _slotIsInRange(slot) {
        return slot >= 0 && slot < this._maxSize;
    }

    _verifySlotIsInRange(slot) {
        if(!this._slotIsInRange(slot)) {
            throw new RangeError(`Slot "${slot}" is out of range for inventory with size "${this._maxSize}"`);
        }
    }
}
