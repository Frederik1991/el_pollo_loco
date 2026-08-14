class Chicken extends MovableObject {

    y = 360;
    width = 60;
    height = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500; // Random x position between 200 and 700
        this.animate();
        
    }

    animate() {
        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_WALKING.length;
            this.img = this.imageCache[this.IMAGES_WALKING[this.currentImageIndex]];
        }, 200);
    }

    
}