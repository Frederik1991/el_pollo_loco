class ThrowableObject extends MovableObject {
    x = 100;
    y = 150;
    width = 100;
    height = 100;

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.applyGravity();
    }
}