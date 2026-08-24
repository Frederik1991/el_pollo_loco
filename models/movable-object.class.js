class MovableObject {
    x = 120;
    y = 290;
    img;
    width = 100;
    height = 150;
    currentImageIndex = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    imageCache = {};

    applyGravity() {
        setInterval(() => {
            if(this.y < 130) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // Move clouds to the left
        }, 1000 / 60); // 60 frames per second
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}