class Coin extends MovableObject {

    width = 100; // Set a fixed width for coins
    height = 100; // Set a fixed height for coins

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        this.x = 200 + Math.random() * 2300; // Random x position between 200 and 2500
        this.y = 50 + Math.random() * 100;; // position coins

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300); 

    }
}