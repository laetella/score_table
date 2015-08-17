var express = require('express');
var mysql = require('mysql');

var app = express();
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'web_demo'
});
var conn;

app.get('*', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    conn = connection;
    next();
  });
})

app.get('/', function(req, res, next) {
  conn.query('SELECT * FROM todos', function(err, rows) {
    res.send(rows);
    conn.release();
  });
})

app.listen(3000, function() {
  console.log("http://localhost:3000");
})
