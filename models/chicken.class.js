class Chicken extends MovableObject {

    y = 360;
    width = 60;
    height = 70;
    speed = 0.15;
    otherDirection = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5; // Random speed between 0.15 and 0.65
        this.x = 1000 + Math.random() * 1000; // Random x position between 200 and 700
        this.animate();
        
    }

    animate() {
        setInterval(() => { 
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.img = this.imageCache[this.IMAGES_DEAD[0]];
            }
        }, 1000 /200);
    }    
}