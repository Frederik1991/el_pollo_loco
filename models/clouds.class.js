class Cloud extends MovableObject {

    width = 600; // Set a fixed width for clouds
    height = 200; // Set a fixed height for clouds

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 50 + Math.random() * 700; // Random x position between 50 and 750
        this.y = 20 + Math.random() * 60; // position clouds near top
    }

    
}