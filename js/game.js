let canvas;
let ctx;
let character = new Image();

function init() {
    // Initialization code for the game
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    character.src = '../img/2_character_pepe/2_walk/W-21.png';

    setTimeout( function() {
    ctx.drawImage(character, 100, 100, 50, 150);
}, 1000);
}
