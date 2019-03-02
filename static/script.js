

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    $('body').css('margin', '0px');

    let level = new parser('a path').getLevel();

    this.game = new Game(level);
}


let angle = Math.PI * 0.3;
function draw() {
    game.draw();
}
