/**
 * Status bar showing how many bottles the character has collected.
 */
class StatusBarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    world;

    /**
     * Creates the bottle status bar, loads its images,
     * and initializes it at 0%.
     * @param {World} world - Reference to the game world.
     */
    constructor(world) {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 55;
        this.width = 220;
        this.height = 60;
        this.world = world;
        this.setPercentage(0);
    }

    /**
     * Sets the current percentage and updates the displayed image.
     * @param {number} percentage - Percentage of collected bottles (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image index matches the current percentage.
     * @returns {number} Index into the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
