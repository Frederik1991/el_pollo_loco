/**
 * Central manager for all game sounds, including mute state
 * persisted in localStorage.
 */
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

    /**
     * Sets the background music to loop and applies the stored mute state.
     */
    static init() {
        this.sounds.music.loop = true;
        this.sounds.music.volume = 0.1;
        this.sounds.jump.volume = 0.5;
        this.sounds.hurt.volume = 0.5;
        this.sounds.throwBottle.volume = 0.5;
        this.sounds.bottleBreak.volume = 0.5;
        this.sounds.collectCoin.volume = 0.4;
        this.sounds.win.volume = 0.6;
        this.sounds.gameOver.volume = 0.6;
        this.applyMuteState();
    }

    /**
     * Plays a sound by name, restarting it from the beginning.
     * Does nothing if sounds are currently muted.
     * @param {string} name - Key of the sound in the sounds object.
     */
    static play(name) {
        if (this.isMuted) {
            return;
        }
        let sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Toggles the mute state, persists it in localStorage,
     * and applies it to all sounds.
     */
    static toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('muted', this.isMuted);
        this.applyMuteState();
    }

    /**
     * Applies the current mute state to every sound in the sounds object.
     */
    static applyMuteState() {
        Object.values(this.sounds).forEach((sound) => {
            sound.muted = this.isMuted;
        });
    }
}