class Level {

    clouds;
    enemies;
    backgroundObjects;
    level_end_x = 2250;
    bottles;

    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }

}