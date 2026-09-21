/**
 * Represents the final boss enemy with its own state machine
 * (alert, walking, attacking, hurt, dead).
 */
class Endboss extends MovableObject {

    width = 300;
    height = 500;
    y = -10;
    energy = 50;
    isAttacking = false;
    offset = {
        top: 20,
        right: 35,
        bottom: 15,
        left: 35,
    };

    world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    isMoving = false;
    animationInterval;
    movementInterval;
    movementStateInterval;
    readyCheckInterval;

    /**
     * Creates the endboss, loads all animation images,
     * and starts its animation and movement-trigger loops.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000
        this.animate();
        this.startMovingWhenReady();
    }

    /**
     * Continuously selects and plays the correct animation
     * based on the endboss's current state.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isMoving) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 100);
    }

    stopAnimations() {
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
        clearInterval(this.movementStateInterval);
        clearInterval(this.readyCheckInterval);
        this.isMoving = false;
        this.isAttacking = false;
    }

    playDeathAnimationOnce(onComplete) {
        this.stopAnimations();
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        this.animationInterval = setInterval(() => {
            if (this.currentImageIndex >= this.IMAGES_DEAD.length - 1) {
                clearInterval(this.animationInterval);
                if (onComplete) {
                    onComplete();
                }
                return;
            }
            this.currentImageIndex++;
            this.img = this.imageCache[this.IMAGES_DEAD[this.currentImageIndex]];
        }, 100);
    }

    /**
     * Waits until the character has reached a certain x position,
     * then triggers the endboss to start moving left.
     */
    startMovingWhenReady() {
        this.readyCheckInterval = setInterval(() => {
            if (this.world && this.world.character.x > 4000) {
                clearInterval(this.readyCheckInterval);
                this.moveLeft();
            }
        }, 100);
    }

    /**
  * Starts the endboss's movement toward the character, alternating
  * between moving and pausing every few seconds until it dies.
  */
    moveLeft() {
        this.isMoving = true;
        this.movementStateInterval = setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.movementStateInterval);
                return;
            }
            this.isMoving = !this.isMoving;
        }, 3000);

        this.movementInterval = setInterval(() => {
            if (this.isDead()) {
                this.isMoving = false;
                clearInterval(this.movementInterval);
                clearInterval(this.movementStateInterval);
                return;
            }

            if (this.isMoving) {
                this.followCharacter();
            }
        }, 150);
    }

    /**
     * Moves the endboss toward the character's current x position,
     * flipping its direction as needed.
     */
    followCharacter() {
        if (this.world.character.x < this.x) {
            this.otherDirection = false;
            this.x -= 30;
        } else {
            this.otherDirection = true;
            this.x += 30;
        }
    }
    /**
     * Triggers the attack animation for a fixed duration,
     * ignoring further calls while already attacking.
     */
    attack() {
        if (this.isAttacking) {
            return;
        }
        this.isAttacking = true;
        this.currentImageIndex = 0;
        setTimeout(() => {
            this.isAttacking = false;
        }, this.IMAGES_ATTACK.length * 200);
    }
}