/*****************************************
 * sample Express app
 * 2019-01 mamund
 *****************************************/

var express = require('express');
var app = express();
var birds = require('./birds');
var port = process.env.PORT || 8181;

app.use('/birds',birds);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

