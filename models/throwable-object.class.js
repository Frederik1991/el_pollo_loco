class ThrowableObject extends MovableObject {
    width = 60;
    height = 80;

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        
    ]

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.IMAGES_ROTATE);
        this.y = y;
        this.x = x;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
        }, 100);
    }
}