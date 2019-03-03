const SPACING = 2000;
const NUM_LETTERS = 7;

class Game {
    constructor(level) {
        this.level = level;

        this.startTime = new Date().getTime();

        this.current = [];
        this.min = -0.12;
        this.max = 2.7;

        this.player_pos = 3;
        this.player_pos_vis = 3;
        this.player_vel = 0;
        this.acc = 0;
        this.got = new Set();
        this.score = 0;

        // this.level = [{
        //     time: -0.12,
        //     type: 'C'
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
                this.got.delete(note);
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

        // fill('#ED225D');
        textFont(myFont);
        textSize(50);
        text(String(this.score), -width / 2 + 50, -height / 2 + 50);


        let dirY = (mouseY / height - 0.5) * 2;
        let dirX = (mouseX / width - 0.5) * 2;

        pointLight(250, 250, 250, 500, -200, -200);
        pointLight(250, 250, 250, 500, -200, 2000);
        directionalLight(250, 250, 250, 100, 150, 0);
        // platform
        translate(0, 0, -200);
        rotateX(angle);

        specularMaterial(125, 0, 0);
        plane(1500, 15000, 500);

        let track_width = 1500;
        let box_width = track_width / NUM_LETTERS;

        this.maintain();
        noStroke();
        for (let note of this.current) {
            push();

            let x_pos = note.type.charCodeAt(0) - 'A'.charCodeAt(0);

            if (this.got.has(note)) {
                specularMaterial(0, 255, 0);
            } else {
                if (this.pos(note) < 0.05 && this.pos(note)>-0.1){
                    if (x_pos === this.player_pos) {
                        this.got.add(note);
                        this.score++;
                    }
                }
                if (this.pos(note) < 0) {
                    specularMaterial(255, 0, 0);

                } else {
                    // normalMaterial(1000, 1000, 1000);
                    ambientMaterial(255,255,255);
                }
            }

            let x_coord = (box_width - track_width) / 2 + box_width * x_pos;
            let y_coord = 400 + (-this.pos(note)) * SPACING;
            translate(x_coord, y_coord, 50);
            // translate(0, 400 + (-this.pos(note) - 0.5) * SPACING, 50);

            box(box_width, 100, 100);

            pop();


        }

        push();

        specularMaterial(250, 250, 250);
        if (this.player_pos_vis !== this.player_pos) {
            this.acc = this.player_pos - this.player_pos_vis;
            // this.acc *= Math.abs(this.acc);
            this.acc *= 0.1;

        }

        this.player_vel += this.acc;
        this.player_vel *= 0.7;
        this.player_pos_vis += this.player_vel;

        translate((box_width - track_width) / 2 + box_width * this.player_pos_vis, 400, 50);
        // translate(0, 400 + (-this.pos(note) - 0.5) * SPACING, 50);
        // box(box_width, 100, 100);
        sphere(40);
        pop();
    }
}
