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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkBottleCollision();
            this.checkCoinCollision();
        }, 200);
    }

    checkThrowObject() {
        if (this.keyboard.d && this.collectedBottles.length > 0) {
            this.collectedBottles.pop();
            this.statusBarBottle.setPercentage(this.collectedBottles.length / 10 * 100);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy)
            }
        });
    }

    checkBottleCollision() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottles.push(bottle);
                this.statusBarBottle.setPercentage(this.collectedBottles.length / 10 * 100);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins.push(coin);
                this.statusBarCoin.setPercentage(this.collectedCoins.length / 10 * 100);
                this.level.coins.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle)
        this.addToMap(this.statusBarCoin)


        self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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
