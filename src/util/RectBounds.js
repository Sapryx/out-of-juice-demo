class RectBounds {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.bottom = 0;
        this.top = 0;
    }

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.top - this.bottom;
    }
}
