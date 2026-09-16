class SoundManager {

    static isMuted = localStorage.getItem('muted') === 'true';

    static sounds = {
    music: new Audio('audio/music.wav'),
    jump: new Audio('audio/jump.flac'),
    hurt: new Audio('audio/hurt.mp3'),
    throwBottle: new Audio('audio/swosh.flac'),
    bottleBreak: new Audio('audio/klirr.wav'),
    collectCoin: new Audio('audio/coin.flac'),
    win: new Audio('audio/win.wav'),
    gameOver: new Audio('audio/game_over.wav'),
};

    static init() {
        this.sounds.music.loop = true;
        this.applyMuteState();
    }

    static play(name) {
        if (this.isMuted) {
            return;
        }
        let sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play();
    }

    static toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('muted', this.isMuted);
        this.applyMuteState();
    }

    static applyMuteState() {
        Object.values(this.sounds).forEach((sound) => {
            sound.muted = this.isMuted;
        });
    }
}