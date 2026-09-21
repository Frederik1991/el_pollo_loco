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
    statusBarHealth = new StatusBarHealth
    statusBarBottle = new StatusBarBottle(this);
    statusBarCoin = new StatusBarCoins(this);
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
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Gives the character and the endboss a reference back to this world.
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
        }, 50);
    }

    /**
     * Checks whether the game has been won or lost, and if so,
     * shows the matching screen and plays the matching sound.
     */
    checkGameStatus() {
        if (this.gameEnded) {
            return;
        }
        if (this.character.isDead()) {
            this.gameEnded = true;
            this.stopEnemyAnimations();
            this.showLoseScreen();
            SoundManager.play('gameOver');
            SoundManager.sounds.music.pause();
        } else if (this.level.enemies.some(e => e instanceof Endboss && e.isDead())) {
            this.gameEnded = true;
            this.stopEnemyAnimations();
            const endboss = this.level.enemies.find(e => e instanceof Endboss);
            endboss.playDeathAnimationOnce(() => this.showWinScreen());
            SoundManager.play('win');
            SoundManager.sounds.music.pause();
        }
    }

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
        document.getElementById('loseScreen').classList.remove('d-none');
    }

    /**
     * Reveals the win screen overlay.
     */
    showWinScreen() {
        document.getElementById('winScreen').classList.remove('d-none');
    }

    /**
     * Checks all thrown bottles against all enemies, damaging or
     * killing an enemy on the first hit and playing a break sound.
     */
    checkThrowableObjectCollisions() {
        this.throwableObject.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (!throwableObject.hasHit && !enemy.isDead() && throwableObject.isColliding(enemy)) {
                    throwableObject.hasHit = true;
                    SoundManager.play('bottleBreak');
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                    } else {
                        enemy.energy = 0;
                    }
                    throwableObject.playAnimation(throwableObject.IMAGES_SPLASH);
                }
            });
        });
    }

    /**
     * Throws a bottle if the throw key is pressed and a bottle
     * is available in the inventory.
     */
    checkThrowObject() {
        let now = new Date().getTime();
        let cooldownElapsed = now - this.lastThrowTime > this.throwCooldown;

        if (this.keyboard.d && this.collectedBottles.length > 0 && cooldownElapsed) {
            this.lastThrowTime = now;
            this.collectedBottles.pop();
            SoundManager.play('throwBottle');
            this.statusBarBottle.setPercentage(this.collectedBottles.length / 20 * 100);
            let direction = this.character.otherDirection ? -1 : 1;
            let spawnX = this.character.x + (direction === 1 ? 100 : -20);
            let bottle = new ThrowableObject(spawnX, this.character.y + 100, this, direction);
            this.throwableObject.push(bottle);
        }
    }

    /**
     * Checks collisions between the character and every living enemy.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }

    /**
     * Resolves a single collision between the character and an enemy:
     * jump-kill, endboss attack, or a normal hit.
     * @param {MovableObject} enemy - The enemy the character collided with.
     */
    handleEnemyCollision(enemy) {
    if (enemy instanceof Chicken && this.character.isFallingOn(enemy)) {
        enemy.energy = 0;
        this.character.jump();
        return;
    }

    if (enemy instanceof Endboss) {
        enemy.attack();
        if (enemy.isAttacking && !this.character.isHurt()) {
            this.character.hit(20);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
        return;
    }

    if (!this.character.isHurt()) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
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
                this.statusBarBottle.setPercentage(this.collectedBottles.length / 20 * 100);
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
                this.statusBarCoin.setPercentage(this.collectedCoins.length / 20 * 100);
                this.level.coins.splice(index, 1);
                SoundManager.play('collectCoin');
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
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    self = this;
    this.animationFrame = requestAnimationFrame(function () {
        self.draw()
    });
}

    /**
 * Draws all level objects (background, enemies, clouds, bottles,
 * coins, thrown bottles) within the camera transform, excluding
 * the character (drawn separately on top).
 */
drawLevelObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObject);
}

    /**
     * Draws the fixed-position status bars.
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
    }

    /**
     * Draws a list of objects onto the canvas.
     * @param {DrawableObject[]} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
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

        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}