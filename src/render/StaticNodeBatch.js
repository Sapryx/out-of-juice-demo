class StaticBatchNode extends ENode {
    constructor(j) {
        super(j);

        this.__childsForRender = [];
        this.__needsBake = 1;
    }

    __updateGeometry() {
        return this;
    }

    __updateVertices() {
        return this;
    }

    __updateUVS() {
        return this;
    }

    __bake() {
        const t = this;
        const nodesToBake = t.__nodesToBake || [];

        if(t.__nodesToBake) {
            $each(t.__nodesToBake, n => {
                n.__updateGeometry().__updateMatrixWorld(1);
            });
        } else {
            t.__traverseChilds(n => {
                if(n.__visible) {
                    n.__updateGeometry().__updateMatrixWorld(1);

                    if(n.__verticesBuffer) {
                        nodesToBake.push(n);
                    }
                }
            });
        }

        if(nodesToBake.length) {
            t.map = nodesToBake[0].map;

            nodesToBake.sort((a, b) => a.__totalZ - b.__totalZ);

            const geom = exportVertices(nodesToBake).geometry;

            t.__verticesBuffer = t.__addAttributeBuffer(
                "position",
                2,
                geom.v
            );

            t.__uvsBuffer = t.__addAttributeBuffer(
                "uv",
                2,
                geom.u
            );

            t.__colorsBuffer = t.__addAttributeBuffer(
                "a_color",
                4,
                geom.c
            );

            t.__indecesBuffer = new MyBufferAttribute(
                "",
                Uint16Array,
                1,
                GL_ELEMENT_ARRAY_BUFFER,
                geom.i
            );
        } else if(t.__indecesBuffer) {
            for(let i in t.__buffers) {
                t.__buffers[i].__destruct();
            }

            t.__buffers = {};

            t.__verticesBuffer =
                t.__uvsBuffer =
                    t.__colorsBuffer =
                        t.__indecesBuffer =
                            t.__indecesBuffer.__destruct();
        }

        return t;
    }
}
