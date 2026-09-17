/**
 * Base class for all objects that can move, be affected by gravity,
 * and collide with other objects (Character, Chicken, Endboss, ThrowableObject).
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    /**
     * Continuously applies gravity, pulling the object down
     * until it reaches the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is currently above the ground.
     * @returns {boolean} True if above ground (always true for ThrowableObject).
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Advances and displays the next frame of a given animation.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    /**
     * Makes the object jump by setting an upward vertical speed.
     */
    jump() {
        this.speedY = 30;
        SoundManager.play('jump');
    }

    /**
     * Checks whether this object's collision box overlaps
     * with another object's collision box.
     * @param {MovableObject} mo - The other object to check against.
     * @returns {boolean} True if the two objects are colliding.
     */
    isColliding(mo) {
        const thisBox = this.getCollisionBox();
        const otherBox = mo.getCollisionBox();

        return thisBox.x + thisBox.width > otherBox.x &&
            thisBox.y + thisBox.height > otherBox.y &&
            thisBox.x < otherBox.x + otherBox.width &&
            thisBox.y < otherBox.y + otherBox.height;
    }

    /**
     * Computes the object's collision box, adjusted by its offsets.
     * @returns {{x: number, y: number, width: number, height: number}} The collision box.
     */
    getCollisionBox() {
        return {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom,
        };
    }

    /**
     * Reduces the object's energy when hit, plays a hurt sound,
     * and updates the last-hit timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        SoundManager.play('hurt');
    }

    /**
     * Checks whether the object was hit within the last second.
     * @returns {boolean} True if recently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks whether the object's energy has reached zero.
     * @returns {boolean} True if dead.
     */
    isDead() {
        return this.energy == 0;
    }
}

