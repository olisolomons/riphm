// const Midi = require("@tonejs/midi");

/*Level obstacle format
 *
 *   time: time obstacle should appear (in seconds)
 *   type: type of obstacle to render
 */

async function parse(file) {
    const midiFile = await Midi.fromUrl(file);
    const level = [];

    for (let track of midiFile.tracks) {
        var lastNoteTime = 0;
        //Change obstacle based on channel and/or instrument? Channels 9 and 10 are used for percussion
        for(let note of track.notes){
            if(note.time === lastNoteTime) {
                continue;
            }
            else {
                level.push({
                    time: note.time,
                    type: note.pitch.charAt(0)
                });
                lastNoteTime = note.time;
            }
        }
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
    return level;
}
