let canvas;
let ctx;
let character = new Character();
let enemies = [
    new chicken(),
    new chicken(),
    new chicken(),
];

function init() {
    // Initialization code for the game
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


console.log('My Character is:', character);
}
