var fs = require('fs');

var express = require('express');

var artist = require('./routes/artist');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.locals.title = 'Nodetunes';
app.use(bodyParser.urlencoded({extended: true}));

app.use('/artist', artist);

require('./lib/mongodb');


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%d', host, port);
});
