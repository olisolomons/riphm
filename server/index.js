const PORT = 21070;

const express = require('express');

const app = express();

let router = new express.Router();
let api = new express.Router();

app.use('/',router);
app.use('/riphm',router);
router.use('/api',api);

// api.get('/level',(req,res)=>{
//     res.json(new midiParse(req.query.file).getLevel());
// });

router.use('/',express.static('static'));

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
