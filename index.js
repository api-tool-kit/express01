var express = require('express');
var app = express();
var birds = require('./birds');
const port = 8181;

app.use('/birds',birds);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

