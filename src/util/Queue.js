class Queue {
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    get size() {
        return this.tailIndex - this.headIndex;
    }

    enqueue(item) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }

    dequeue() {
        if(this.isEmpty()) {
            return undefined;
        }

        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;

        return item;
    }

    peek() {
        return this.items[this.headIndex];
    }

    isEmpty() {
        return this.size === 0;
    }
}
