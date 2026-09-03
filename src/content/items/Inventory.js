class Inventory {
    constructor() {
        this._items = [];
    }

    get itemCount() {
        return this._items.length;
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
        this._items.push(item);
        BUS.__post(E.PlayerInventoryChanged);
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
        this._items.splice(slot, 1);
        BUS.__post(E.PlayerInventoryChanged);
        return true;
    }

    hasItem(slot) {
        return this._slotIsInRange(slot);
    }

    _slotIsInRange(slot) {
        return Number.isInteger(slot) && slot >= 0 && slot < this._items.length;
    }

    _verifySlotIsInRange(slot) {
        if(!this._slotIsInRange(slot)) {
            throw new RangeError(`Slot "${slot}" is out of range for inventory with size "${this._items.length}"`);
        }
    }
}
