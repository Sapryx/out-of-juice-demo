class SoundEffect {
    constructor(volume, channel, sounds) {
        this.volume = volume;
        this.channel = channel;
        this._sounds = sounds;
    }

    /**
     * @returns {string}
     */
    getSound() {
        return randomArrayMember(this._sounds);
    }
}
