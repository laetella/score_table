var express = require('express');
var mysql = require('mysql');

var app = express();
var connection;

app.get('*', function(res, req, next) {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'web_demo'
  });
  connection.connect(function(err) {
    next();
  })
})

app.get('/', function(req, res) {
  connection.query('SELECT * FROM todos', function(err, rows) {
    res.send(rows);
    connection.end();
  })
})

app.listen(3000, function() {
  console.log("http://localhost:3000");
})
