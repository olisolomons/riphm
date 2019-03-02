function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    $('body').css('margin', '0px');

    parse('pirates.mid').then(level => {
        console.log("parsed");
        this.game = new Game(level);
    });

    (async () => {
        Tone.Transport.clear();
        Tone.Transport.stop();

        const synth = new Tone.Synth().toMaster();
        const response = await fetch("api/file?file=static/pirates.mid");
        // console.log(await response.text());
        const midiJson = await response.json();

        const midi = MidiConvert.fromJSON(midiJson);

        Tone.Transport.bpm.value = midi.bpm;
        Tone.Transport.timeSignature = midi.timeSignature;

        midi.tracks.forEach(track => {
            new Tone.Part((time, event) => {
                synth.triggerAttackRelease(
                    event.name,
                    event.duration,
                    time,
                    event.velocity
                );
            }, track.notes).start(midi.startTime);
        });

        Tone.Transport.start();
    })().then(() => {
        console.log("done");
    }).catch((e) => {
        console.log("error :()");
        console.log(e);
    });

}


let angle = Math.PI * 0.3;

function draw() {
    if (this.game) {
        game.draw();
    }
}
