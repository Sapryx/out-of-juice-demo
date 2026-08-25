class Tileset {
    /**
     * @param {string} imageName
     * @param {number} width
     * @param {number} height
     * @param {number} tileWidth
     * @param {number} tileHeight
     */
    constructor(imageName, width, height, tileWidth, tileHeight) {
        this._imageName = imageName;
        this._width = width;
        this._height = height;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._rows = height / tileHeight;
        this._cols = width / tileWidth;
    }

    /**
     * @param {Object} config
     * @returns {Tileset}
     */
    static fromConfig(config) {
        const name = config.name.replace(/\.\w+$/, "");
        return new Tileset(
            name,
            config.width,
            config.height,
            config.tileWidth,
            config.tileHeight
        );
    }

    get imageName() {
        return this._imageName;
    }

    get tileWidth() {
        return this._tileWidth;
    }

    get tileHeight() {
        return this._tileHeight;
    }

    /**
     * @param {number} tileX
     * @param {number} tileY
     * @returns {{x: number, y: number, w: number, h: number}}
     */
    tilePixelRect(tileX, tileY) {
        return {
            x: tileX * this._tileWidth,
            y: (this._rows - 1 - tileY) * this._tileHeight,
            w: this._tileWidth,
            h: this._tileHeight
        };
    }

    /**
     * @param {ENode} node
     * @param {number} tileX
     * @param {number} tileY
     */
    applyToNode(node, tileX, tileY) {
        const pixelRect = this.tilePixelRect(tileX, tileY);
        const sheet = {w: this._width, h: this._height};

        node.__img = this._imageName;
        node.__tilePixelRect = pixelRect;
        node.__sheetSize = sheet;

        node.__updateUVS = function() {
            const uv = Tileset.computeAtlasTileUV(this);
            this.__uvsBuffer = this.__addAttributeBuffer("uv", 2, uv);
            return this;
        };
    }

    /**
     * Maps a pixel rect inside the tilesheet into atlas UV space.
     * @param {ENode} node  must have __tilePixelRect, __sheetSize; preferably __frame/map
     * @returns {number[]}  [tl.u, tl.v, tr.u, tr.v, bl.u, bl.v, br.u, br.v]
     */
    static computeAtlasTileUV(node) {
        const pr = node.__tilePixelRect;
        const sheet = node.__sheetSize;
        const frame = node.__frame || (node.map && node.map.f);

        let u1;
        let u2;
        let v1;
        let v2;

        if(frame && frame.r && (frame.tex || node.map)) {
            const tex = frame.tex || node.map;
            const img = tex.__image || tex;
            const ox = img.width;
            const oy = img.height;
            const rx = frame.r[0];
            const ry = frame.r[1];

            u1 = (rx + pr.x) / ox;
            u2 = (rx + pr.x + pr.w) / ox;
            v1 = 1 - (ry + pr.y) / oy;
            v2 = 1 - (ry + pr.y + pr.h) / oy;
        } else if(frame && frame.v) {
            const [fx1, fx2, fy1, fy2] = frame.v;
            const lu1 = pr.x / sheet.w;
            const lu2 = (pr.x + pr.w) / sheet.w;
            const lv1 = pr.y / sheet.h;
            const lv2 = (pr.y + pr.h) / sheet.h;

            u1 = fx1 + lu1 * (fx2 - fx1);
            u2 = fx1 + lu2 * (fx2 - fx1);
            v1 = fy1 + lv1 * (fy2 - fy1);
            v2 = fy1 + lv2 * (fy2 - fy1);
        } else {
            u1 = pr.x / sheet.w;
            u2 = (pr.x + pr.w) / sheet.w;
            v1 = 1 - pr.y / sheet.h;
            v2 = 1 - (pr.y + pr.h) / sheet.h;
        }

        return [
            u1, v1,
            u2, v1,
            u1, v2,
            u2, v2
        ];
    }
}
