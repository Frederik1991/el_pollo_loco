/**
 * Base class for all objects that can be drawn on the canvas.
 * Handles image loading, caching, and rendering.
 */
class DrawableObject {
    img;
    currentImageIndex = 0;
    imageCache = {};
    x = 120;
    y = 290;
    width = 100;
    height = 150;

    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's current image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads a list of images into the image cache.
     * @param {string[]} arr - Array of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a debug frame around the object's collision box.
     * Only applies to Character, Chicken, and Endboss instances.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            const collisionBox = this.getCollisionBox();
            ctx.beginPath();
            ctx.linewidth = '10';
            ctx.strokeStyle = 'blue';
            ctx.rect(collisionBox.x, collisionBox.y, collisionBox.width, collisionBox.height);
            ctx.stroke();
        }
    }
}