/**
 * Represents a bottle thrown by the character, including its
 * flight, rotation, and splash animation on impact.
 */
class ThrowableObject extends MovableObject {
    width = 60;
    height = 80;
    hasHit = false;

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

   constructor(x, y, world, direction = 1) {
    super();
    this.world = world;
    this.direction = direction;
    this.loadImage('img/6_salsa_bottle/salsa_bottle.png')
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.y = y;
    this.x = x;
    this.throw();
    this.animate();
}

throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
        this.x += 10 * this.direction;
    }, 25);
}

    /**
     * Continuously plays the rotation animation while airborne,
     * and switches to the splash animation on ground/enemy impact.
     */
    animate() {
        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATE);
            }
            if (this.y >= 360 || this.world.level.enemies.some(enemy => this.isColliding(enemy))) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 100);
    }
}