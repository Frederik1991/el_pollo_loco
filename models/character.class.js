class Character extends MovableObject {
    y = 130;
    width = 140;
    height = 300;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;

    

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x +100;
        }, 1000 / 60);
 

        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_WALKING.length;
            this.img = this.imageCache[this.IMAGES_WALKING[this.currentImageIndex]];
            }
        }, 50);

    
    }

    jump() {

    }
}