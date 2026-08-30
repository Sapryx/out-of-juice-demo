class GameAudio {
    constructor() {
        this.channelVolume = {
            sfx: 1,
            music: 1
        };
    }

    play(sfx) {
        if(!sfx) {
            return;
        }

        const soundId = sfx.getSound();
        const howl = getSoundHowl(soundId);
        const channelVolumeMult = this.channelVolume[sfx.channel] || 1;

        howl.volume(sfx.volume * channelVolumeMult);
        howl.play(soundId);
    }
}
