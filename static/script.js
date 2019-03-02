function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    $('body').css('margin', '0px');

    parse('pirates.mid').then(level => {
        console.log("parsed");
        this.game = new Game(level);
    });

}


let angle = Math.PI * 0.3;

function draw() {
    if (this.game) {
        game.draw();
    }
}
