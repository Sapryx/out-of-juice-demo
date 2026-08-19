class RoomNode {
    constructor(config) {
        this.type = config.type;
        this.connecterNodes = [];
    }

    /**
     * @param {RoomNode} node
     */
    connectTo(node) {
        this.connecterNodes.push(node);
    }

    /**
     * @returns {Array<RoomNode>}
     */
    getConnectedNodes() {
        return this.connecterNodes;
    }
}
