class LevelType {
    constructor(id, config) {
        this.rooms = config.rooms.map(roomNodeConfig => new RoomNode(roomNodeConfig));
        this.id = id;

        config.links.forEach(link => {
            const nodeA = this.rooms[link.a - 1];
            const nodeB = this.rooms[link.b - 1];

            nodeA.connectTo(nodeB);
            nodeB.connectTo(nodeA);
        });
    }

    getRooms() {
        return this.rooms;
    }
}
