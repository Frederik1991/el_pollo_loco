let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    init();
}

function restartGame() {
    if (world) {
        clearInterval(world.gameInterval);
        cancelAnimationFrame(world.animationFrame);
    }
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
}

function init() {
    createLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is:', world.character);
}


window.addEventListener("keydown", (event) => {
    if (event.key == 'ArrowLeft') {
        keyboard.left = true;
    }
    if (event.key == 'ArrowRight') {
        keyboard.right = true;
    }
    if (event.key == 'ArrowUp') {
        keyboard.up = true;
    }
    if (event.key == 'ArrowDown') {
        keyboard.down = true;
    }
    if (event.key == ' ') {
        keyboard.space = true;
    }
    if (event.code == 'KeyD') {
        keyboard.d = true;
    }

});

window.addEventListener("keyup", (event) => {
    if (event.key == 'ArrowLeft') {
        keyboard.left = false;
    }
    if (event.key == 'ArrowRight') {
        keyboard.right = false;
    }
    if (event.key == 'ArrowUp') {
        keyboard.up = false;
    }
    if (event.key == 'ArrowDown') {
        keyboard.down = false;
    }
    if (event.key == ' ') {
        keyboard.space = false;
    }
    if (event.code == 'KeyD') {
        keyboard.d = false;
    }

});