class ThrowableObject extends MovableObject {
    width = 60;
    height = 80;

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.y = y;
        this.x = x;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);

    }
}