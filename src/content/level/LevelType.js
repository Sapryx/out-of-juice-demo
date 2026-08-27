class LevelType {
    /**
     * @param {string} id
     * @param {Object} config
     */
    constructor(id, config) {
        this.rooms = config.rooms.map(roomNodeConfig => new RoomNode(roomNodeConfig));
        this._id = id;

        config.links.forEach(link => {
            const nodeA = this.rooms[link.a - 1];
            const nodeB = this.rooms[link.b - 1];

            nodeA.connectTo(nodeB);
            nodeB.connectTo(nodeA);
        });
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {Array<RoomNode>}
     */
    getRooms() {
        return this.rooms;
    }
}
