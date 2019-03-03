const track = 'mario';

let myFont;
let count = 5;

let controls = 'mouse';

function preload() {
    myFont = loadFont('Poly-Regular.otf');
}

let pg;
let game;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pg = createGraphics(256, 256);

    $('body').css('margin', '0px');

    let mp3 = `${window.location}/${track}.wav`;
    let audio = new Audio(mp3);
    audio.onended = function() {
        setTimeout(() => {
            window.location.replace(`/riphm/end?score=${game.score}`);
        }, 1000);
    };

    function doCount() {
        if (count >= 0) {
            setTimeout(doCount, 1000);
            if (count === 0) {
                parse(`${track}.mid`).then(level => {
                    setTimeout(() => {
                        game = new Game(level);
                        console.log("parsed");
                        audio.play();
                        count--;
                    }, 50);
                });
            } else {
                count--;
            }
        }
    }
    setTimeout(doCount, 1000);
}

let angle = Math.PI * 0.3;

function draw() {
    if (count === -1) {
        game.player_pos = Math.floor(mouseX/width*7);
        game.draw();
    } else {
        background(100);
        textFont(myFont);
        textSize(100);
        text(String(count), 0, 0);
    }
}

function keyPressed() {
    if (!game || controls!=='keyboard') {
        return;
    }

    if (keyCode === LEFT_ARROW) {
        if (game.player_pos > 0) {
            game.player_pos -= 1;
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (game.player_pos < 6) {
            game.player_pos += 1;
        }
    }
}
