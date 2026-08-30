class Coin extends MovableObject {

    width = 100; // Set a fixed width for clouds
    height = 100; // Set a fixed height for clouds

    constructor() {
    super();
    this.loadImage('img/8_coin/coin_1.png');

    this.x = 50 + Math.random() * 2300; // Random x position between 50 and 2500
    this.y = 360; // position Bottles near bottom

    this.animate();

}

    animate() {

        setInterval(() => {
            this.moveLeft();
            this.x -= this.speed; // Move clouds to the left
        }, 1000 / 60); // 60 frames per second
      
    }
}