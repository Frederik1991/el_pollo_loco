/**
 * Represents the playable character (Pepe) including movement,
 * animations, and interaction with the game world.
 */
class Character extends MovableObject {
    y = 20;
    width = 140;
    height = 300;
    speed = 10;
    offset = {
        top: 140,
        right: 60,
        bottom: 10,
        left: 40,
    };
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    currentDeadFrame = 0;
    currentJumpFrame = 0;
    jumpFrameCounter = 0;
    lastActionTime = new Date().getTime();
    world;

    /**
     * Creates the character, loads all animation images,
     * and starts gravity and animation loops.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts a jump and resets the jump animation to its first frame.
     */
    jump() {
        this.currentJumpFrame = 0;
        this.jumpFrameCounter = 0;
        super.jump();
    }

    /**
     * Checks whether the character is currently falling onto the
     * top side of a given movable object (used for jump-kill logic).
     * @param {MovableObject} mo - The object to check against.
     * @returns {boolean} True if the character is landing on top of mo.
     */
    isFallingOn(mo) {
        const characterBox = this.getCollisionBox();
        const otherBox = mo.getCollisionBox();
        const currentBottom = characterBox.y + characterBox.height;
        const previousBottom = currentBottom + this.speedY;
        const isFalling = this.speedY < 0;
        const crossedEnemyTop = previousBottom <= otherBox.y + 15 && currentBottom > otherBox.y;
        const overlapsHorizontally = characterBox.x + characterBox.width > otherBox.x &&
            characterBox.x < otherBox.x + otherBox.width;

        return isFalling && crossedEnemyTop && overlapsHorizontally;
    }

    /**
     * Starts the movement/input loop and the animation-selection loop.
     */
    animate() {
        setInterval(() => {
            this.handleMovementInput();
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimationState();
        }, 1000 / 10);
    }

    /**
     * Handles per-frame movement input: horizontal movement, jumping,
     * and camera follow. Does nothing if the character is dead.
     */
    handleMovementInput() {
        if (this.isDead()) {
            return;
        }
        this.handleHorizontalMovement();
        this.handleJumpInput();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Moves the character left or right based on keyboard input
     * and updates the last-action timestamp.
     */
    handleHorizontalMovement() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.lastActionTime = new Date().getTime();
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            this.lastActionTime = new Date().getTime();
        }
    }

    /**
     * Triggers a jump if the jump key is pressed and the character
     * is currently on the ground.
     */
    handleJumpInput() {
        if (this.world.keyboard.space && !this.isAboveGround()) {
            this.jump();
            this.lastActionTime = new Date().getTime();
        }
    }

    /**
     * Selects and plays the correct animation based on the
     * character's current state (hurt, dead, jumping, walking, idle).
     */
    handleAnimationState() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isDead()) {
            this.playDeadAnimationOnce();
        } else if (this.isAboveGround()) {
            this.playJumpAnimationOnce();
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playWalkingAnimation();
        } else if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
    * Plays the jump animation once, advancing one frame per
    * animation tick and holding the last frame until landing.
  */
    playJumpAnimationOnce() {
        this.jumpFrameCounter++;

        if (this.jumpFrameCounter >= 1 && this.currentJumpFrame < this.IMAGES_JUMPING.length - 1) {
            this.currentJumpFrame++;
            this.jumpFrameCounter = 0;
        }

        this.img = this.imageCache[this.IMAGES_JUMPING[this.currentJumpFrame]];
    }

    /**
 * Plays the death animation once, holding the last frame
 * instead of looping.
 */
    playDeadAnimationOnce() {
        if (this.currentDeadFrame < this.IMAGES_DEAD.length - 1) {
            this.currentDeadFrame++;
        }
        this.img = this.imageCache[this.IMAGES_DEAD[this.currentDeadFrame]];
    }

    /**
     * Advances and plays the next frame of the walking animation.
     */
    playWalkingAnimation() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_WALKING.length;
        this.img = this.imageCache[this.IMAGES_WALKING[this.currentImageIndex]];
    }

    /**
     * Checks whether the character has been inactive long enough
     * to switch to the long-idle (sleep) animation.
     * @returns {boolean} True if at least 15 seconds have passed since the last action.
     */
    isLongIdle() {
        let timePassed = (new Date().getTime() - this.lastActionTime) / 1000;
        return timePassed >= 15;
    }
}