class RoomMatch {
    /**
     * @param {Room} targetRoom
     * @param {RoomAsset} matchedRoomAsset
     * @param {Door} targetDoor
     * @param {Door} matchedDoor
     */
    constructor(targetRoom, matchedRoomAsset, targetDoor, matchedDoor) {
        this.targetRoom = targetRoom;
        this.matchedRoomAsset = matchedRoomAsset;
        this.targetDoor = targetDoor;
        this.matchedDoor = matchedDoor;
    }
}
