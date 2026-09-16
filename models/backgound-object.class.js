/**
 * Represents a static background layer object positioned along the x-axis.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new background object and loads its image.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}