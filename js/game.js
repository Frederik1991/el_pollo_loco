let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('load', () => {
    SoundManager.init();
    updateMuteIcon();
    setupTouchControls();
});

/**
 * Hides the start screen, initializes a new game, and starts the music.
 */
function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    init();
    SoundManager.sounds.music.play();
}

/**
 * Stops the current game loop, hides the win/lose screens,
 * and shows the start screen again.
 */
function restartGame() {
    if (world) {
        clearInterval(world.gameInterval);
        cancelAnimationFrame(world.animationFrame);
    }
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
}

/**
 * Builds a fresh level and creates a new World instance.
 */
function init() {
    createLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Toggles the mute state and updates the mute button icon.
 */
function toggleMute() {
    SoundManager.toggleMute();
    updateMuteIcon();
}

/**
 * Updates the mute button's icon to match the current mute state.
 */
function updateMuteIcon() {
    let button = document.getElementById('muteButton');
    button.textContent = SoundManager.isMuted ? '🔇' : '🔊';
}

/**
 * Binds all touch control buttons to their matching keyboard properties.
 */
function setupTouchControls() {
    bindTouchButton('btnLeft', 'left');
    bindTouchButton('btnRight', 'right');
    bindTouchButton('btnJump', 'space');
    bindTouchButton('btnThrow', 'd');
}

/**
 * Shows the story/controls info dialog.
 */
function openInfoDialog() {
    document.getElementById('infoDialog').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

/**
 * Hides the story/controls info dialog.
 */
function closeInfoDialog() {
    document.getElementById('infoDialog').classList.add('d-none');
}


function closeInfoDialog() {
    document.getElementById('infoDialog').classList.add('d-none');
    document.body.style.overflow = '';
}

/**
 * Closes the info dialog if the click landed on the overlay itself,
 * not inside the dialog box.
 * @param {MouseEvent} event - The click event.
 */
function closeInfoDialogOnOverlay(event) {
    if (event.target.id === 'infoDialog') {
        closeInfoDialog();
    }
}

/**
 * Binds touch start/end events for a single touch button to a
 * keyboard property, and disables its context menu.
 * @param {string} buttonId - The button's DOM id.
 * @param {string} keyboardProperty - The Keyboard property to toggle.
 */
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