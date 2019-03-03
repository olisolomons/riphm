const track = 'mario';

let myFont;
let count = 5;

let controls = 'keyboard';

function preload() {
    myFont = loadFont('Poly-Regular.otf');
    playerModel = loadModel('/riphm/player.obj');
    noteModel = loadModel('/riphm/note.obj');

}

let pg;
let game;
let ws = new WebSocket(`wss://${window.location.host}/riphm/api/ws`);
let id;
let others = {};

let playerModel;
let noteModel;


ws.onmessage = (msg) => {
    msg = JSON.parse(msg.data);
    switch (msg.type) {
        case 'id':
            ws.send(JSON.stringify({
                type: 'announce',
                id: msg.id
            }));
            id = msg.id;
            break;
        case 'announce':
            ws.send(JSON.stringify({
                type: 'respond',
                id: id
            }));
        case 'respond':
            others[msg.id] = {
                pos: 3,
                pos_vis: 3,
                acc: 0,
                vel: 0
            };
            break;
        case 'move':
            others[msg.id].pos = msg.pos;
            break;
        case 'dc':
            delete others[msg.id];
            break;
        case 'start':
            start()
            break;
    }
};

function sleep(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, time);
    });;
}

let audio;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pg = createGraphics(256, 256);

    $('body').css('margin', '0px');

    let mp3 = `${window.location}/${track}.wav`;
    audio = new Audio(mp3);
    audio.onended = function() {
        setTimeout(() => {
            window.location.replace(`/riphm/end?score=${game.score}`);
        }, 1000);
    };

}
async function start() {
    let level = await parse(`${track}.mid`);

    game = new Game(level);
    for (; count >= 0; count--) {
        await sleep(1000);
    }
    audio.play();
}

let angle = Math.PI * 0.3;

function draw() {
    if (game) {
        if (controls === 'mouse') {
            game.player_pos = Math.floor(mouseX / width * 7);
        }
        game.draw();
    }
    if (count !== -1) {
        translate(-60, 300, 300);
        textFont(myFont);
        textSize(300);
        ambientMaterial(0, 0, 0);
        if (count === 0) {
            translate(-120, 0, 0);
            text("Go!", 0, 0);
        } else {
            text(String(count), 0, 0);
        }
    }

}


function keyPressed() {
    if(keyCode===ENTER){
        start();
    }
    if (!game) {
        return;
    }
    if (controls !== 'keyboard') {
        return;
    }
    if (keyCode === LEFT_ARROW) {
        game.player_pos -= 1;

    } else if (keyCode === RIGHT_ARROW) {
        game.player_pos += 1;
    }
    let pos = keyCode - '1'.charCodeAt(0);
    if (pos >= 0 && pos <= 6) {
        game.player_pos = pos;
    }
}
