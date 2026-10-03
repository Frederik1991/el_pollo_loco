/**
 * Status bar showing the character's current health/energy.
 */
class StatusBarHealth extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;
  flashUntil = 0;
  flashInset = {
    top: 30,
    right: 5,
    bottom: 10,
    left: 27,
  };

  /**
   * Creates the health status bar, loads its images,
   * and initializes it at 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 5;
    this.width = 220;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the current percentage and updates the displayed image.
   * @param {number} percentage - Percentage of remaining health (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image index matches the current percentage.
   * The empty image is only shown at exactly 0%, matching the
   * point where the character actually dies.
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

  /**
   * Triggers a brief red flash overlay to visually confirm damage,
   * even when the percentage change doesn't cross a displayed threshold.
   */
  triggerFlash() {
    this.flashUntil = new Date().getTime() + 150;
  }

  /**
   * Draws the bar image, plus a brief, rounded red flash overlay,
   * inset to roughly match the visible bar area.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);
    if (new Date().getTime() < this.flashUntil) {
      let x = this.x + this.flashInset.left;
      let y = this.y + this.flashInset.top;
      let width = this.width - this.flashInset.left - this.flashInset.right;
      let height = this.height - this.flashInset.top - this.flashInset.bottom;

      ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 12);
      ctx.fill();
    }
  }
}