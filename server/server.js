var Queue = require("./queue.js");

var express = require('express');
const bodyParser     = require('body-parser');

var port = process.env.PORT || 5000;

const queue = new Queue();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/file', (req, res) => {

  queue.addRequest(req.body);
  queue.processRequests();

  res.send('Request queue started');

});

app.listen(port, () => console.log(`Listening on port ${port}`));
