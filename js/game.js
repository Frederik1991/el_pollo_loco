let canvas;
let world;
let keyboard = new Keyboard();



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


    console.log('My Character is:', world.character);
}


window.addEventListener("keydown", (event) => {
    if (event.keycode == 37) {
        keyboard.left = true;
    }
    if (event.keycode == 39) {
        keyboard.right = true;
    }
    if (event.keycode == 38) {
        keyboard.up = true;
    }
    if (event.keycode == 40) {
        keyboard.down = true;
    }
    if (event.keycode == 32) {
        keyboard.space = true;
    }

});

window.addEventListener("keyup", (event) => {
    if (event.keycode == 37) {
        keyboard.left = false;
    }
    if (event.keycode == 39) {
        keyboard.right = false;
    }
    if (event.keycode == 38) {
        keyboard.up = false;
    }
    if (event.keycode == 40) {
        keyboard.down = false;
    }
    if (event.keycode == 32) {
        keyboard.space = false;
    }

});