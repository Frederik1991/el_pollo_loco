class Level {

    clouds;
    enemies;
    backgroundObjects;
    level_end_x = 2600;
    bottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

}