class Game {
    constructor(level) {
        this.level = level;

        this.startTime = new Date().getTime();

        this.current = [];
        this.min = -1;
        this.max = 5;

        // this.level = [{
        //     time: 4
        // }];
    }

    maintain() {
        while (this.level.length > 0) {
            let note = this.level[0];
            if (this.pos(note) < this.max) {
                this.current.push(this.level.shift());
            } else {
                break;
            }
        }
        while (this.current.length > 0) {
            let note = this.current[0];
            if (this.pos(note) < this.min) {
                this.current.shift();
            } else {
                break;
            }
        }
    }
    pos(note) {
        return note.time - this.time() / 1000;
    }

    time() {
        // return 0;
        return new Date().getTime() - this.startTime;
    }

    draw() {
        // camera(0, 0, frameCount * 0.1, 0, 0, 0, 0, 1, 0);
        background(100);

        let dirY = (mouseY / height - 0.5) * 2;
        let dirX = (mouseX / width - 0.5) * 2;
        pointLight(250,250,250,800,200,200);
        directionalLight(250, 250, 250, 100, 150, 0);

        // platform
        translate(0, 0, -200);
        rotateX(angle);
        specularMaterial(250, 0, 0);
        plane(1500, 15000, 500);

        this.maintain();
        for (let note of this.current) {
            push();
            if(this.pos(note) < 0 ){
                specularMaterial(0,255, 0);
            }else{
                specularMaterial(1000, 1000, 1000);
            }
            switch (note.type) {
                case 'low':
                    translate(0, 400 + (-this.pos(note)-0.5) * 1000, 50);
                    box(1500, 100, 100);
                    break;
                case 'high':
                    translate(0, 400 + (-this.pos(note)-0.5) * 1000, 150);
                    box(1500, 100, 100);
                    break;
                case 'left':
                    translate(-375, 400 + (-this.pos(note)-0.5) * 1000, 150);
                    box(750, 100, 300);
                    break;
                case 'right':
                    translate(375, 400 + (-this.pos(note)-0.5) * 1000, 150);
                    box(750, 100, 300);
                    break;
                default:

            }

            pop();
        }
    }
}
