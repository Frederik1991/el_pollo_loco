/**
 * Status bar showing the endboss's current health. Hidden until
 * the character first spots the endboss.
 */
class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]

    isVisible = false;

    /**
     * Creates the endboss health bar, loads its images,
     * and initializes it at 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 450;
        this.y = 5;
        this.width = 220;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the current percentage and updates the displayed image.
     * @param {number} percentage - Percentage of remaining endboss health (0-100).
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
        if (this.percentage <= 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}