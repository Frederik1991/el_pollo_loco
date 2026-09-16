class ChickenSmall extends Chicken {

    y = 400;
    width = 40;
    height = 45;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.3 + Math.random() * 0.6; // etwas schneller als normale Chicken
        this.x = 1000 + Math.random() * 1000;
    }
}