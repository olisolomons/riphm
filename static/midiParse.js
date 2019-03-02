// const Midi = require("@tonejs/midi");

/*Level obstacle format
 *
 *   time: time obstacle should appear (in seconds)
 *   type: type of obstacle to render
 */

async function parse(file) {
    console.log("parse1");
    const midiFile = await Midi.fromUrl(file);
    console.log("parse2");
    const level = [];

    for (let track of midiFile.tracks) {
        console.log(track);
        //Change obstacle based on channel and/or instrument? Channels 9 and 10 are used for percussion
        if (track.channel === 0 || track.channel === 1) {
            track.notes.forEach(note => {

                //Generate an obstacle based on note.time, note.pitch, note.octave, note.duration, note.velocity?
                if (note.pitch.charAt(0) < "C".charAt(0)) {
                    if (track.channel === 0) {
                        //generate low object
                        level.push({
                            time: note.time,
                            type: "low"
                        });
                    } else {
                        //generate left object
                        level.push({
                            time: note.time,
                            type: "left"
                        });
                    }
                } else {
                    if (track.channel === 0) {
                        //generate high object
                        level.push({
                            time: note.time,
                            type: "high"
                        });
                    } else {
                        //generate right object
                        level.push({
                            time: note.time,
                            type: "right"
                        });
                    }
                }
            });
        } else if (track.instrument.percussion) {
            //Generate percussion obstacles
            track.notes.forEach(note => {
                level.push({
                    time: note.time,
                    type: "percussion"
                });
            });
        }
        console.log("here");
    }

    level.sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        } else if (a.time > b.time) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log("parse3");
    return level;
}
