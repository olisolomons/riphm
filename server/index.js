const PORT = 21070;

const express = require('express');
const MidiConvert = require('midiconvert');
const fs = require('fs');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

let router = new express.Router();
let api = new express.Router();

app.use('/', router);
app.use('/riphm', router);
router.use('/api', api);

api.get('/file', (req, res) => {
    console.log(req.query);
    fs.readFile(req.query.file, "binary", function(err, midiBlob) {
        if (!err) {
            var midi = MidiConvert.parse(midiBlob);
            res.json(midi);
        }
    })
    // MidiConvert.load(req.query.file, function(midi) {
    //     res.json(midi);
    // })
});

let websockets = new Set();
let wsId = 0;
api.ws('/ws', (ws, req) => {
    websockets.add(ws);

    ws.send(JSON.stringify({
        type: 'id',
        id: wsId++
    }));


    ws.on('message', msg => {
        let obj=JSON.parse(msg);
        for (let ws2 of websockets) {
            if (ws2 === ws && obj.type!=='start') {
                continue;
            }

            ws2.send(msg);
        }
    });

    ws.on('close', () => {
        websockets.delete(ws);

        for (let ws2 of websockets) {
            ws2.send(JSON.stringify({
                type: 'dc'
            }));
        }
    })
});

router.use('/', express.static('static'));

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
