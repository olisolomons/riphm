// const Midi = require("@tonejs/midi");

/*Level obstacle format
 *
 *   time: time obstacle should appear (in seconds)
 *   type: type of obstacle to render
 */

class parser {
    constructor(file) {
        let actualThis = this;
        Midi.fromUrl(file).then(midiFile => {
            console.log("over 'ere'");
            const level = [];

            midiFile.tracks.forEach(track => {
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
                    return;
                } else if (track.instrument.percussion) {
                    //Generate percussion obstacles
                    track.notes.forEach(note => {
                        level.push({
                            time: note.time,
                            type: "percussion"
                        });
                    });
                }
            });

            level.sort(a, b => {
                if (a.time < b.time) {
                    return -1;
                } else if (a.time > b.time) {
                    return 1;
                } else {
                    return 0;
                }
            });
            actualThis.level = level;
        }).catch(e => {
            actualThis.error=e;
        });
    }

    getLevel() {
        return this.level;
    }

}
