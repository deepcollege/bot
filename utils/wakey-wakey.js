const express = require('express');
const http = require("http");
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(80, () => {
  setInterval(function() {
    http.get(`http://${process.env.HEROKU_APP_NAME}.herokuapp.com`);
  }, 6000);
});