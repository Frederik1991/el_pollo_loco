/**
 * Represents the game world: holds the character, level, status bars,
 * and coordinates collision checks, drawing, and game state.
 */
class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarBottle = new StatusBarBottle(this);
  statusBarCoin = new StatusBarCoins(this);
  statusBarEndboss = new StatusBarEndboss();
  throwableObject = [];
  collectedBottles = [];
  collectedCoins = [];
  lastThrowTime = 0;
  throwCooldown = 800; // Millisekunden zwischen zwei Würfen

  /**
   * Creates the game world and starts drawing, world-linking,
   * and the main game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard input state.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Gives the character and every enemy a reference back to this world.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the main game loop, running all collision and status checks.
   */
  run() {
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
      this.checkThrowableObjectCollisions();
      this.checkBottleCollision();
      this.checkCoinCollision();
      this.checkGameStatus();
      this.checkEndbossVisibility();
    }, 1000 / 60);
  }

  /**
   * Checks whether the game has been won or lost, and if so,
   * delegates to the matching handler.
   */
  checkGameStatus() {
    if (this.gameEnded) {
      return;
    }
    if (this.character.isDead()) {
      this.handleLoss();
    } else if (
      this.level.enemies.some((e) => e instanceof Endboss && e.isDead())
    ) {
      this.handleWin();
    }
  }

  /**
   * Stops the game, shows the lose screen, and plays the game-over sound.
   */
  handleLoss() {
    this.gameEnded = true;
    clearInterval(this.gameInterval);
    this.stopEnemyAnimations();
    this.showLoseScreen();
    SoundManager.play("gameOver");
    SoundManager.sounds.music.pause();
  }

  /**
   * Stops the game, plays the endboss death animation, then shows
   * the win screen and plays the win sound.
   */
  handleWin() {
    this.gameEnded = true;
    clearInterval(this.gameInterval);
    this.stopEnemyAnimations();
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    endboss.playDeathAnimationOnce(() => this.showWinScreen());
    SoundManager.play("win");
    SoundManager.sounds.music.pause();
  }

  /**
   * Reveals the endboss health bar the first time the character
   * gets close enough to see the endboss.
   */
  checkEndbossVisibility() {
    if (this.statusBarEndboss.isVisible) {
      return;
    }
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && Math.abs(this.character.x - endboss.x) < 700) {
      this.statusBarEndboss.isVisible = true;
    }
  }

  /**
   * Stops all running animations/intervals for chickens and the endboss,
   * e.g. once the game has ended.
   */
  stopEnemyAnimations() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Chicken || enemy instanceof Endboss) {
        enemy.stopAnimations();
      }
    });
  }

  /**
   * Reveals the lose screen overlay.
   */
  showLoseScreen() {
    document.getElementById("loseScreen").classList.remove("d-none");
  }

  /**
   * Reveals the win screen overlay.
   */
  showWinScreen() {
    document.getElementById("winScreen").classList.remove("d-none");
  }

  /**
   * Checks all thrown bottles against all enemies, resolving
   * a hit on the first match and playing a break sound.
   */
  checkThrowableObjectCollisions() {
    this.throwableObject.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (
          !throwableObject.hasHit &&
          !enemy.isDead() &&
          throwableObject.isColliding(enemy)
        ) {
          this.resolveBottleHit(throwableObject, enemy);
        }
      });
    });
  }

  /**
   * Marks a bottle as having hit, damages or kills the enemy,
   * plays the break sound and splash animation.
   * @param {ThrowableObject} throwableObject - The bottle that hit.
   * @param {MovableObject} enemy - The enemy that was hit.
   */
  resolveBottleHit(throwableObject, enemy) {
    throwableObject.hasHit = true;
    SoundManager.play("bottleBreak");

    if (enemy instanceof Endboss) {
      enemy.hit();
      this.statusBarEndboss.setPercentage((enemy.energy / 50) * 100);
      this.statusBarEndboss.triggerFlash();
    } else {
      enemy.energy = 0;
    }

    throwableObject.playAnimation(throwableObject.IMAGES_SPLASH);
  }

  /**
   * Throws a bottle if the throw key is pressed and a bottle
   * is available in the inventory.
   */
  checkThrowObject() {
    let now = new Date().getTime();
    let cooldownElapsed = now - this.lastThrowTime > this.throwCooldown;

    if (
      this.keyboard.d &&
      this.collectedBottles.length > 0 &&
      cooldownElapsed
    ) {
      this.lastThrowTime = now;
      this.collectedBottles.pop();
      this.character.lastActionTime = now;
      SoundManager.play("throwBottle");
      this.statusBarBottle.setPercentage(
        (this.collectedBottles.length / 20) * 100,
      );
      let direction = this.character.otherDirection ? -1 : 1;
      let spawnX = this.character.x + (direction === 1 ? 100 : -20);
      let bottle = new ThrowableObject(
        spawnX,
        this.character.y + 100,
        this,
        direction,
      );
      this.throwableObject.push(bottle);
    }
  }

  /**
   * Checks collisions between the character and every living enemy.
   * If the character lands on top of any enemy, kills those enemies
   * and skips normal damage entirely for this frame.
   */
  checkCollisions() {
    const collidingEnemies = this.level.enemies.filter(
      (enemy) => !enemy.isDead() && this.character.isColliding(enemy),
    );

    if (collidingEnemies.length === 0) {
      return;
    }

    const jumpKilledAny = this.handleJumpKills(collidingEnemies);
    if (jumpKilledAny) {
      return;
    }

    collidingEnemies.forEach((enemy) => this.handleEnemyCollision(enemy));
  }

  /**
   * Kills every chicken the character is currently landing on top of.
   * @param {MovableObject[]} collidingEnemies - Enemies colliding with the character.
   * @returns {boolean} True if at least one enemy was jump-killed.
   */
  handleJumpKills(collidingEnemies) {
    const fallenOn = collidingEnemies.filter(
      (enemy) => enemy instanceof Chicken && this.character.isFallingOn(enemy),
    );

    if (fallenOn.length === 0) {
      return false;
    }

    fallenOn.forEach((enemy) => (enemy.energy = 0));
    this.character.jump();
    return true;
  }

  /**
   * Resolves a single collision between the character and an enemy:
   * endboss attack, or a normal hit.
   * @param {MovableObject} enemy - The enemy the character collided with.
   */
  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      enemy.attack();
      if (enemy.isAttacking && !this.character.isHurt()) {
        this.character.hit(20);
        this.statusBarHealth.setPercentage(this.character.energy);
        this.statusBarHealth.triggerFlash();
      }
      return;
    }

    if (!this.character.isHurt()) {
      this.character.hit();
      this.statusBarHealth.setPercentage(this.character.energy);
      this.statusBarHealth.triggerFlash();
    }
  }

  /**
   * Checks whether the character collects any bottles lying
   * on the ground and updates the bottle status bar.
   */
  checkBottleCollision() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectedBottles.push(bottle);
        SoundManager.play("bottle");
        this.statusBarBottle.setPercentage(
          (this.collectedBottles.length / 20) * 100,
        );
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Checks whether the character collects any coins and
   * updates the coin status bar.
   */
  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins.push(coin);
        this.statusBarCoin.setPercentage(
          (this.collectedCoins.length / 20) * 100,
        );
        this.level.coins.splice(index, 1);
        SoundManager.play("collectCoin");
      }
    });
  }

  /**
   * Clears and redraws the entire canvas, then schedules
   * the next animation frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    self = this;
    this.animationFrame = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws all level objects (background, clouds, enemies, bottles,
   * thrown bottles) within the camera transform, excluding coins and
   * the character (both drawn separately on top of the status bars).
   */
  drawLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObject);
  }

  /**
   * Draws the fixed-position status bars, including the endboss
   * bar once it has been made visible.
   */
  drawStatusBars() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    if (this.statusBarEndboss.isVisible) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Draws a list of objects onto the canvas.
   * @param {DrawableObject[]} objects - Objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object, mirroring it horizontally if it
   * currently faces the other direction.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
