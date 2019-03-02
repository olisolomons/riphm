const PORT = 21070;

const express = require('express');

const app = express();

let router = new express.Router();

app.use('/',router);
app.use('/riphm',router);

router.use('/',express.static('static'));

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
