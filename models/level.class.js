/**
 * Represents a game level, holding all its enemies, clouds,
 * background layers, bottles, and coins.
 */
class Level {

    clouds;
    enemies;
    backgroundObjects;
    level_end_x = 5130;
    bottles;
    coins;

    /**
     * Creates a new level with the given content.
     * @param {MovableObject[]} enemies - Enemies in the level (e.g. Chicken, Endboss).
     * @param {Cloud[]} clouds - Background clouds.
     * @param {BackgroundObject[]} backgroundObjects - Background layer objects.
     * @param {Bottle[]} bottles - Collectible bottles.
     * @param {Coin[]} coins - Collectible coins.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

}