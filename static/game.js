class Game {
    constructor(level){
        this.level = level;

        this.startTime = new Date().getTime();

        this.current = [];

    }

    

    time(){
        return new Date().getTime() - this.startTime;
    }

    draw(){
        // camera(0, 0, frameCount * 0.1, 0, 0, 0, 0, 1, 0);
        background(100);

        let dirY = (mouseY / height - 0.5) * 2;
        let dirX = (mouseX / width - 0.5) * 2;
        directionalLight(250, 250, 250, 100, 100, 0.25);

        // platform
        translate(0, 0, -200);
        rotateX(angle);
        specularMaterial(250, 0, 0);
        plane(1500, 15000, 500);

        specularMaterial(1000, 1000, 1000);

        for(let note of this.level){
            push();
            translate(0, 400+(this.time()/1000-note.time)*1000, 50);
            box(1500,100,100);

            pop();
        }
    }
}
