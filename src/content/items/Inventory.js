class Inventory {
    constructor(size) {
        if(size < 1) {
            throw new RangeError(`Cannot create inventory with zero or negative size`);
        }

        this._itemCount = 0;
        this._maxSize = size;
        this._items = new Array(size).fill(null);
    }

    /**
     * @returns {int}
     */
    get itemCount() {
        return this._itemCount;
    }

    /**
     * @returns {int}
     */
    get maxSize() {
        return this._maxSize;
    }

    /**
     * @param {int} slot
     * @returns {Item}
     * @throws {RangeError} slot out of range
     */
    getItem(slot) {
        this._verifySlotIsInRange(slot);
        return this._items[slot];
    }

    /**
     * @returns {ReadonlyArray<Item|null>}
     */
    getItems() {
        return Object.freeze([...this._items]);
    }

    /**
     * @param {Item} item
     * @returns {boolean}
     */
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

    /**
     * @param {int} slot
     * @returns {boolean}
     * @throws {RangeError} slot out of range
     */
    removeItem(slot) {
        this._verifySlotIsInRange(slot);
        const noItemInSlot = this._items[slot] == null;

        if(noItemInSlot) {
            return false;
        }

        this._itemCount--;
        this._items[slot] = null;
        return true;
    }

    /**
     * @param {int} slot
     * @returns {boolean}
     */
    hasItem(slot) {
        if(!this._slotIsInRange(slot)) {
            return false;
        }

        return this._items[slot] != null;
    }

    /**
     * @param {int} slot
     * @returns {boolean}
     * @private
     */
    _slotIsInRange(slot) {
        return slot >= 0 && slot < this._maxSize;
    }

    /**
     * @param {int} slot
     * @throws {RangeError} slot out of range
     * @private
     */
    _verifySlotIsInRange(slot) {
        if(!this._slotIsInRange(slot)) {
            throw new RangeError(`Slot "${slot}" is out of range for inventory with size "${this._maxSize}"`);
        }
    }
}
