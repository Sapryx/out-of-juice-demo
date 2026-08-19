class RoomNode {
    constructor(config) {
        this.type = config.type;
        this.connectedNodes = [];
    }

    /**
     * @param {RoomNode} node
     */
    connectTo(node) {
        this.connectedNodes.push(node);
    }

    /**
     * @returns {Array<RoomNode>}
     */
    getConnectedNodes() {
        return this.connectedNodes;
    }
}
