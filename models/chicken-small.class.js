/**
 * Represents a smaller, faster variant of the Chicken enemy.
 */
class ChickenSmall extends Chicken {

    y = 365;
    width = 50;
    height = 55;
    offset = {
        top: 8,
        right: 5,
        bottom: 2,
        left: 5,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new small chicken with its own images,
     * a randomized speed, and a random starting position.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.3 + Math.random() * 0.6; // etwas schneller als normale Chicken
        this.x = 1500 + Math.random() * 4000;
    }
}