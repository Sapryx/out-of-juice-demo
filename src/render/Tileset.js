class Tileset {
    constructor(imageName, width, height, tileWidth, tileHeight) {
        this.imageName = imageName;
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    static fromConfig(config) {
        return new Tileset(
            config.name.replace(/\.\w+$/, ""),
            config.width,
            config.height,
            config.tileWidth,
            config.tileHeight
        );
    }

    static computeAtlasTileUV(node) {
        const pr = node.__tilePixelRect;
        const sheet = node.__sheetSize;
        const frame = node.__frame || (node.map && node.map.f);
        const uv = Tileset._pixelRectToUV(pr, sheet, frame, node);

        return [
            uv.u1, uv.v1,
            uv.u2, uv.v1,
            uv.u1, uv.v2,
            uv.u2, uv.v2
        ];
    }

    static _pixelRectToUV(pr, sheet, frame, node) {
        if(frame && frame.r && (frame.tex || node.map)) {
            const tex = frame.tex || node.map;
            const img = tex.__image || tex;
            const ox = img.width;
            const oy = img.height;
            const rx = frame.r[0];
            const ry = frame.r[1];

            return {
                u1: (rx + pr.x) / ox,
                u2: (rx + pr.x + pr.w) / ox,
                v1: 1 - (ry + pr.y) / oy,
                v2: 1 - (ry + pr.y + pr.h) / oy
            };
        }

        if(frame && frame.v) {
            const [fx1, fx2, fy1, fy2] = frame.v;
            const lu1 = pr.x / sheet.w;
            const lu2 = (pr.x + pr.w) / sheet.w;
            const lv1 = pr.y / sheet.h;
            const lv2 = (pr.y + pr.h) / sheet.h;

            return {
                u1: fx1 + lu1 * (fx2 - fx1),
                u2: fx1 + lu2 * (fx2 - fx1),
                v1: fy1 + lv1 * (fy2 - fy1),
                v2: fy1 + lv2 * (fy2 - fy1)
            };
        }

        return {
            u1: pr.x / sheet.w,
            u2: (pr.x + pr.w) / sheet.w,
            v1: 1 - pr.y / sheet.h,
            v2: 1 - (pr.y + pr.h) / sheet.h
        };
    }

    tilePixelRect(tileX, tileY) {
        return {
            x: tileX * this.tileWidth,
            y: tileY * this.tileHeight,
            w: this.tileWidth,
            h: this.tileHeight
        };
    }

    applyToNode(node, tileX, tileY) {
        node.__img = this.imageName;
        node.__tilePixelRect = this.tilePixelRect(tileX, tileY);
        node.__sheetSize = {w: this.width, h: this.height};

        node.__updateUVS = function() {
            this.__uvsBuffer = this.__addAttributeBuffer("uv", 2, Tileset.computeAtlasTileUV(this));
            return this;
        };
    }
}
