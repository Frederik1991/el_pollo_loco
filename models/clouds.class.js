class Cloud extends MovableObject {

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 50 + Math.random() * 700; // Random x position between 50 and 750
        this.y = 20 + Math.random() * 60; // position clouds near top
        this.width = 400; // Set a fixed width for clouds
        this.height = 300; // Set a fixed height for clouds
    }

    
}