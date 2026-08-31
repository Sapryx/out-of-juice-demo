class RoomMatch {
    /**
     * @param {Room} targetRoom
     * @param {RoomAsset} matchedRoomAsset
     * @param {Door} targetDoor
     * @param {Door} matchedDoor
     * @param {int} [matchedRotation]
     */
    constructor(targetRoom, matchedRoomAsset, targetDoor, matchedDoor, matchedRotation = 0) {
        this.targetRoom = targetRoom;
        this.matchedRoomAsset = matchedRoomAsset;
        this.targetDoor = targetDoor;
        this.matchedDoor = matchedDoor;
        this.matchedRotation = matchedRotation;
    }
}
