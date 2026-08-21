class Level {

    clouds;
    enemies;
    backgroundObjects;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }

}