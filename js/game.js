let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('load', () => {
    SoundManager.init();
    updateMuteIcon();
    setupTouchControls();
});

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    init();
    SoundManager.sounds.music.play();
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
}

function toggleMute() {
    SoundManager.toggleMute();
    updateMuteIcon();
}

function updateMuteIcon() {
    let button = document.getElementById('muteButton');
    button.textContent = SoundManager.isMuted ? '🔇' : '🔊';
}

function setupTouchControls() {
    bindTouchButton('btnLeft', 'left');
    bindTouchButton('btnRight', 'right');
    bindTouchButton('btnJump', 'space');
    bindTouchButton('btnThrow', 'd');
}

function openInfoDialog() {
    document.getElementById('infoDialog').classList.remove('d-none');
}

function closeInfoDialog() {
    document.getElementById('infoDialog').classList.add('d-none');
}

function closeInfoDialogOnOverlay(event) {
    if (event.target.id === 'infoDialog') {
        closeInfoDialog();
    }
}

function bindTouchButton(buttonId, keyboardProperty) {
    let button = document.getElementById(buttonId);

    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard[keyboardProperty] = true;
    });

    button.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard[keyboardProperty] = false;
    });

    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
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
        event.preventDefault();
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