class ThrowableObject extends MovableObject {
    x = 100;
    y = 150;
    width = 60;
    height = 80;

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.throw(100, 100);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);

    }
}