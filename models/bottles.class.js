class Bottle extends MovableObject {

width = 60; // Set a fixed width for Bottles
height = 80; // Set a fixed height for Bottles

constructor() {
    super();
    this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

    this.x = 50 + Math.random() * 2300; // Random x position between 50 and 2500
    this.y = 360; // position Bottles near bottom

}
}
