/**
 * Creates a given number of objects of a class, positioned randomly
 * within a range while keeping a minimum distance between them.
 * @param {Function} ObjectClass - The class to instantiate.
 * @param {number} count - Number of objects to create.
 * @param {number} minimumDistance - Minimum distance between object positions.
 * @param {number} minimumX - Minimum x position.
 * @param {number} maximumX - Maximum x position.
 * @returns {Object[]} Array of created and positioned objects.
 */
function createObjects(ObjectClass, count, minimumDistance, minimumX, maximumX) {
    const positions = [];
    let attempts = 0;

    while (positions.length < count && attempts < 10000) {
        const position = minimumX + Math.random() * (maximumX - minimumX);
        const positionIsFree = positions.every(existingPosition =>
            Math.abs(position - existingPosition) >= minimumDistance
        );

        if (positionIsFree) {
            positions.push(position);
        }

        attempts++;
    }

    return positions.map(position => {
        const object = new ObjectClass();
        object.x = position;
        return object;
    });
}

/**
 * Builds (or rebuilds) the global level1 instance with fresh enemies,
 * clouds, background layers, bottles, and coins.
 */
function createLevel1() {
    level1 = new Level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Endboss(),
        ],

        [
            new Cloud(),
            new Cloud(),
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],

        createObjects(Bottle, 10, 180, 50, 2350),

        createObjects(Coin, 10, 180, 200, 2500),
    );
}

createLevel1();
