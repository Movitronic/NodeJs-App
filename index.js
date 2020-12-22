var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const server = require('http').createServer(app);
var port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());



var Operators = require('./routes/Operators');
app.use('/operators', Operators);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    const path = require('path');
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(port, function () {
  console.log('Server is running on port: ' + port);
});
