const PORT = 21070;

const express = require('express');
const MidiConvert = require('midiconvert');
const fs = require('fs');

const app = express();

let router = new express.Router();
let api = new express.Router();

app.use('/', router);
app.use('/riphm', router);
router.use('/api', api);

api.get('/file', (req, res) => {
    console.log(req.query);
    fs.readFile(req.query.file, "binary", function(err, midiBlob) {
        if (!err) {
            var midi = MidiConvert.parse(midiBlob)
            res.json(midi);
        }
    })
    // MidiConvert.load(req.query.file, function(midi) {
    //     res.json(midi);
    // })
});

router.use('/', express.static('static'));

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
