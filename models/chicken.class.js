/**
 * Represents a basic walking chicken enemy that follows the character.
 */
class Chicken extends MovableObject {

    y = 360;
    width = 60;
    height = 70;
    speed = 0.15;
    otherDirection = false;
    world;
    offset = {
        top: 8,
        right: 5,
        bottom: 2,
        left: 5,
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    animationInterval;

    /**
     * Creates a new chicken with a randomized speed and starting position,
     * loads its images, and starts its animation loop.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 1800 + Math.random() * 4000;
        this.animate();
    }

    /**
     * Continuously moves and animates the chicken toward the character
     * while alive, or shows the dead frame once its energy reaches zero.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.isDead()) {
                this.followCharacter();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.img = this.imageCache[this.IMAGES_DEAD[0]];
            }
        }, 1000 / 200);
    }

    /**
     * Stops the chicken's animation/movement interval.
     */
    stopAnimations() {
        clearInterval(this.animationInterval);
    }

    /**
     * Moves the chicken toward the character's current x position,
     * flipping its direction as needed, and stops once close enough
     * to avoid jittering back and forth.
     */
    followCharacter() {
        if (!this.world) {
            this.moveLeft();
            return;
        }

        const distance = this.world.character.x - this.x;
        const tolerance = 5;

        if (Math.abs(distance) <= tolerance) {
            return;
        }

        if (this.world.character.x < this.x) {
            this.otherDirection = false;
            this.moveLeft();
        } else if (this.world.character.x > this.x) {
            this.otherDirection = true;
            this.moveRight();
        }
    }
}